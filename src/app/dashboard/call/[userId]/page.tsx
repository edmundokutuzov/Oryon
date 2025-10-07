'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { users, getCurrentUser } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, PhoneOff, Video, VideoOff, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';

export default function CallPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);

  const userId = Number(params.userId);
  const callType = searchParams.get('type') || 'video';
  
  const currentUser = getCurrentUser();
  const otherUser = users.find(u => u.id === userId);
  const otherUserAvatar = PlaceHolderImages.find(p => p.id === `user-avatar-${otherUser?.id}`)?.imageUrl;
  const currentUserAvatar = PlaceHolderImages.find(p => p.id === `user-avatar-${currentUser.id}`)?.imageUrl;
  
  useEffect(() => {
    if (callType === 'video') {
      const getCameraPermission = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          setHasCameraPermission(true);

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error('Error accessing camera:', error);
          setHasCameraPermission(false);
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions in your browser settings.',
          });
        }
      };

      getCameraPermission();
      
      // Cleanup function to stop the stream
      return () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
      };
    }
  }, [callType, toast]);
  
  if (!otherUser) {
    return (
      <div className="p-6 fade-in h-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Utilizador não encontrado</h1>
          <p className="text-muted-foreground">O utilizador que procura não existe ou não está disponível.</p>
        </div>
      </div>
    );
  }

  const handleToggleMute = () => setIsMuted(!isMuted);
  const handleToggleCamera = () => {
    if(callType === 'video'){
        setIsCameraOff(!isCameraOff);
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            const videoTrack = stream.getVideoTracks()[0];
            if(videoTrack) {
                videoTrack.enabled = isCameraOff; // it's inverted because state update is async
            }
        }
    }
  };

  return (
    <div className="h-full flex flex-col bg-background text-foreground fade-in relative">
      {/* Remote User Video/Avatar */}
      <div className="flex-grow flex items-center justify-center bg-slate-900/50 relative">
        <Avatar className="h-40 w-40 border-4 border-primary/50">
          <AvatarImage src={otherUserAvatar} alt={otherUser.name} />
          <AvatarFallback className="text-6xl">{otherUser.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="absolute bottom-6 left-6 text-left">
            <h1 className="text-4xl font-bold">{otherUser.name}</h1>
            <p className="text-muted-foreground text-lg">Chamando...</p>
        </div>
         <div className="absolute top-4 right-4 bg-card/50 p-2 rounded-lg flex items-center gap-2">
            <Volume2 className="text-green-400" />
            <div className="w-16 h-1 bg-muted rounded-full"><div className="w-10 h-1 bg-green-400 rounded-full"></div></div>
         </div>
      </div>
      
      {/* Local User Video */}
      <div className={`absolute bottom-24 right-6 w-64 h-40 rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/50 transition-all duration-300 ${isCameraOff ? 'hidden' : 'block'}`}>
        {callType === 'video' ? (
             <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
        ) : (
            <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                <Avatar className="h-20 w-20">
                     <AvatarImage src={currentUserAvatar} alt={currentUser.name} />
                     <AvatarFallback className="text-3xl">{currentUser.name.charAt(0)}</AvatarFallback>
                 </Avatar>
            </div>
        )}
        <div className="absolute bottom-2 left-2 text-white text-xs bg-black/50 px-2 py-0.5 rounded">
            {currentUser.name}
        </div>
      </div>

       {!hasCameraPermission && callType === 'video' && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full max-w-md">
                <Alert variant="destructive">
                    <AlertTitle>Acesso à Câmera Necessário</AlertTitle>
                    <AlertDescription>
                        Por favor, permita o acesso à câmera para usar esta funcionalidade.
                    </AlertDescription>
                </Alert>
            </div>
        )}

      {/* Controls */}
      <div className="flex-shrink-0 bg-background/80 backdrop-blur-md p-4 flex items-center justify-center gap-4 border-t border-border">
        <Button variant="outline" size="icon" className={`rounded-full h-14 w-14 ${isMuted ? 'bg-destructive/20 text-destructive' : ''}`} onClick={handleToggleMute}>
            {isMuted ? <MicOff /> : <Mic />}
        </Button>
        <Button variant="outline" size="icon" className={`rounded-full h-14 w-14 ${isCameraOff ? 'bg-destructive/20 text-destructive' : ''}`} onClick={handleToggleCamera} disabled={callType === 'voice'}>
            {isCameraOff ? <VideoOff /> : <Video />}
        </Button>
         <Link href="/dashboard">
            <Button size="icon" className="rounded-full h-16 w-16 bg-red-600 hover:bg-red-700 text-white">
                <PhoneOff />
            </Button>
        </Link>
      </div>
    </div>
  );
}
