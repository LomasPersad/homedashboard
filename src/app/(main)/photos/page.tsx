import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from 'next/image';
import { PhotoUpload } from "./photo-upload";

export default function PhotosPage() {
    return (
        <div className="space-y-6">
            <PhotoUpload />
            <Card>
                <CardContent className="p-4 md:p-6">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {PlaceHolderImages.map(photo => (
                            <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-xl">
                                <Image 
                                    src={photo.imageUrl}
                                    alt={photo.description}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint={photo.imageHint}
                                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-3">
                                    <p className="text-sm font-semibold text-white drop-shadow-md">{photo.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
