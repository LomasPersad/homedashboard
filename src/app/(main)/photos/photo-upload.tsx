'use client';

import { useState, useTransition, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateMonthlyHighlights, GenerateMonthlyHighlightsOutput } from '@/ai/flows/generate-monthly-highlights';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Upload, Loader2, CheckCircle, X } from 'lucide-react';
import Image from 'next/image';

export function PhotoUpload() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [highlightResult, setHighlightResult] = useState<GenerateMonthlyHighlightsOutput | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const dataUris: string[] = [];

    const fileReaderPromises = fileArray.map(file => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            resolve(reader.result);
          } else {
            reject(new Error('Failed to read file as data URI'));
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(fileReaderPromises).then(newPreviews => {
        setPreviews(prev => [...prev, ...newPreviews]);
    }).catch(error => {
        console.error("Error reading files:", error);
        toast({
          variant: 'destructive',
          title: 'Error reading files',
          description: 'Could not read the selected files. Please try again.',
        });
    });
  };

  const removePreview = (index: number) => {
    setPreviews(prev => prev.filter((_, i) => i !== index));
  }

  const handleGenerateHighlights = async () => {
    if (previews.length === 0) {
      toast({
        variant: 'destructive',
        title: 'No Photos Selected',
        description: 'Please upload some photos before generating highlights.',
      });
      return;
    }

    startTransition(async () => {
      setHighlightResult(null);
      try {
        const result = await generateMonthlyHighlights({ 
          photoDataUris: previews,
          month: new Date().toLocaleString('default', { month: 'long', year: 'numeric' }) 
        });
        setHighlightResult(result);
        toast({
          title: 'Highlights Generated!',
          description: 'Your monthly highlight album has been created.',
        });
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'Error Generating Highlights',
          description: error instanceof Error ? error.message : 'An unknown error occurred.',
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Manage Photos</CardTitle>
        <CardDescription>
          Upload your favorite baby photos and let AI create a beautiful monthly highlight album.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          multiple
          className="hidden"
        />
        <Button size="lg" className="w-full sm:w-auto" onClick={() => fileInputRef.current?.click()}>
          <Upload className="mr-2 h-5 w-5" />
          Upload Photos
        </Button>
        <Button
          size="lg"
          onClick={handleGenerateHighlights}
          disabled={isPending || previews.length === 0}
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90 sm:w-auto"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Monthly Highlights
            </>
          )}
        </Button>
      </CardContent>
      {previews.length > 0 && (
         <CardContent>
            <h3 className="font-headline text-lg mb-2">Selected Photos ({previews.length})</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {previews.map((src, index) => (
                    <div key={index} className="relative group aspect-square">
                        <Image
                            src={src}
                            alt={`Preview ${index + 1}`}
                            fill
                            className="object-cover rounded-md border"
                        />
                        <Button
                            variant="destructive"
                            size="icon"
                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removePreview(index)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>
         </CardContent>
      )}
      {highlightResult && (
        <CardContent>
            <div className="mt-4 rounded-lg border border-green-500 bg-green-50 p-4 dark:bg-green-950">
                <div className="flex flex-col items-start gap-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <div>
                          <h3 className="font-headline text-lg text-green-800 dark:text-green-200">Highlights Ready!</h3>
                          <p className="text-sm text-green-700 dark:text-green-300">AI has selected the best photos for this month's album.</p>
                      </div>
                    </div>
                    
                    <div className="w-full space-y-4 rounded-md bg-background p-4 border">
                        <h4 className="font-semibold font-headline">AI Reasoning:</h4>
                        <p className="text-sm text-muted-foreground italic">"{highlightResult.reasoning}"</p>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 w-full">
                        {highlightResult.highlightedPhotoDataUris.map((uri, index) => (
                            <div key={index} className="relative aspect-square">
                                <Image
                                    src={uri}
                                    alt={`Highlighted Photo ${index + 1}`}
                                    fill
                                    className="rounded-md object-cover border-2 border-green-500 shadow-lg"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </CardContent>
      )}
    </Card>
  );
}
