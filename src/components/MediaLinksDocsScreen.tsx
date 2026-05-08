import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Image, Link, FileText, Download, Search } from "lucide-react";

const MediaLinksDocsScreen = ({ 
  user, 
  onBack 
}: { 
  user: { name: string; username: string; rate: number; online: boolean }; 
  onBack: () => void; 
}) => {
  const mediaItems = [
    { id: 1, type: "image", name: "vacation-photo.jpg", date: "2 days ago", size: "2.1 MB" },
    { id: 2, type: "image", name: "screenshot.png", date: "1 week ago", size: "834 KB" },
  ];

  const linkItems = [
    { id: 1, url: "https://example.com/article", title: "Interesting Article", date: "3 days ago" },
    { id: 2, url: "https://youtube.com/watch", title: "YouTube Video", date: "1 week ago" },
  ];

  const docItems = [
    { id: 1, type: "pdf", name: "contract.pdf", date: "5 days ago", size: "1.5 MB" },
    { id: 2, type: "doc", name: "meeting-notes.docx", date: "2 weeks ago", size: "456 KB" },
  ];

  return (
    <div className="mobile-container flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-lg font-semibold">Media, Links & Docs</h1>
            <p className="text-xs text-muted-foreground">with {user.name}</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search media, links, and documents..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="media" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mx-4 mt-4">
            <TabsTrigger value="media" className="flex items-center gap-2">
              <Image size={16} />
              Media
            </TabsTrigger>
            <TabsTrigger value="links" className="flex items-center gap-2">
              <Link size={16} />
              Links
            </TabsTrigger>
            <TabsTrigger value="docs" className="flex items-center gap-2">
              <FileText size={16} />
              Docs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="media" className="flex-1 overflow-auto p-4 space-y-3">
            {mediaItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Image size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.date} • {item.size}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Download size={16} />
                </Button>
              </div>
            ))}
            {mediaItems.length === 0 && (
              <div className="text-center py-12">
                <Image size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No media shared yet</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="links" className="flex-1 overflow-auto p-4 space-y-3">
            {linkItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Link size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.url}</p>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
              </div>
            ))}
            {linkItems.length === 0 && (
              <div className="text-center py-12">
                <Link size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No links shared yet</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="docs" className="flex-1 overflow-auto p-4 space-y-3">
            {docItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <FileText size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.date} • {item.size}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Download size={16} />
                </Button>
              </div>
            ))}
            {docItems.length === 0 && (
              <div className="text-center py-12">
                <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No documents shared yet</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MediaLinksDocsScreen;