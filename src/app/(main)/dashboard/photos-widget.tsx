import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from 'next/image';
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PhotosWidget() {
    const recentPhotos = PlaceHolderImages.slice(0, 3);
    const remainingCount = PlaceHolderImages.length > 3 ? PlaceHolderImages.length - 3 : 0;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="font-headline text-lg">Photo Highlights</CardTitle>
                <Button variant="outline" size="sm" asChild>
                    <Link href="/photos">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-3 gap-2">
                    {recentPhotos.map((photo, index) => (
                        <Link href="/photos" key={photo.id} className="relative aspect-square overflow-hidden rounded-md">
                            <Image
                                src={photo.imageUrl}
                                alt={photo.description}
                                fill
                                className="object-cover transition-transform hover:scale-105"
                                data-ai-hint={photo.imageHint}
                            />
                             {index === 2 && remainingCount > 0 && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                    <span className="text-2xl font-bold text-white">+{remainingCount}</span>
                                </div>
                            )}
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
