import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, Download, FileText, Image, Calendar as CalendarIcon, Check } from "lucide-react";
import { format } from "date-fns";

const ExportChatScreen = ({ 
  user, 
  onBack 
}: { 
  user: { name: string; username: string; rate: number; online: boolean }; 
  onBack: () => void; 
}) => {
  const [exportFormat, setExportFormat] = useState<string>("");
  const [includeMedia, setIncludeMedia] = useState(true);
  const [includeSystemMessages, setIncludeSystemMessages] = useState(false);
  const [dateRange, setDateRange] = useState<{start?: Date; end?: Date}>({});
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      setExportComplete(true);
      setTimeout(() => setExportComplete(false), 3000);
    }, 2000);
  };

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
            <h1 className="text-lg font-semibold">Export Chat</h1>
            <p className="text-xs text-muted-foreground">with {user.name}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* Export Format */}
        <div className="space-y-3">
          <h3 className="font-semibold">Export Format</h3>
          <Select value={exportFormat} onValueChange={setExportFormat}>
            <SelectTrigger>
              <SelectValue placeholder="Choose export format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="txt">Text File (.txt)</SelectItem>
              <SelectItem value="json">JSON (.json)</SelectItem>
              <SelectItem value="html">HTML (.html)</SelectItem>
              <SelectItem value="pdf">PDF (.pdf)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Range */}
        <div className="space-y-3">
          <h3 className="font-semibold">Date Range</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-sm text-muted-foreground mb-2">From</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon size={16} className="mr-2" />
                    {dateRange.start ? format(dateRange.start, "MMM dd, yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateRange.start}
                    onSelect={(date) => setDateRange(prev => ({ ...prev, start: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">To</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon size={16} className="mr-2" />
                    {dateRange.end ? format(dateRange.end, "MMM dd, yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateRange.end}
                    onSelect={(date) => setDateRange(prev => ({ ...prev, end: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Export Options */}
        <div className="space-y-3">
          <h3 className="font-semibold">Export Options</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <Checkbox
                id="include-media"
                checked={includeMedia}
                onCheckedChange={(checked) => setIncludeMedia(checked as boolean)}
              />
              <div className="flex-1">
                <label htmlFor="include-media" className="font-medium cursor-pointer">
                  Include Media Files
                </label>
                <p className="text-sm text-muted-foreground">
                  Export images, videos, and documents
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <Checkbox
                id="include-system"
                checked={includeSystemMessages}
                onCheckedChange={(checked) => setIncludeSystemMessages(checked as boolean)}
              />
              <div className="flex-1">
                <label htmlFor="include-system" className="font-medium cursor-pointer">
                  Include System Messages
                </label>
                <p className="text-sm text-muted-foreground">
                  Call logs, payment notifications, etc.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Export Summary */}
        {exportFormat && (
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <FileText size={16} className="text-primary" />
              Export Summary
            </h4>
            <div className="space-y-1 text-sm">
              <p><span className="text-muted-foreground">Format:</span> {exportFormat.toUpperCase()}</p>
              <p><span className="text-muted-foreground">Date Range:</span> {
                dateRange.start && dateRange.end 
                  ? `${format(dateRange.start, "MMM dd")} - ${format(dateRange.end, "MMM dd, yyyy")}`
                  : "All messages"
              }</p>
              <p><span className="text-muted-foreground">Include Media:</span> {includeMedia ? "Yes" : "No"}</p>
              <p><span className="text-muted-foreground">Estimated Size:</span> ~2.5 MB</p>
            </div>
          </div>
        )}
      </div>

      {/* Export Button */}
      <div className="p-4 border-t border-border">
        <Button
          onClick={handleExport}
          disabled={!exportFormat || isExporting}
          className="w-full"
        >
          {isExporting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Exporting...
            </>
          ) : exportComplete ? (
            <>
              <Check size={16} className="mr-2" />
              Export Complete
            </>
          ) : (
            <>
              <Download size={16} className="mr-2" />
              Export Chat
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ExportChatScreen;