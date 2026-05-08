import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Download, FileText, BarChart3, Calendar, FileSpreadsheet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Space {
  id: number;
  title: string;
  host: string;
  username: string;
  type: string;
  participants: number;
  maxParticipants: number;
  credits: number;
  status: string;
}

const ExportAnalyticsScreen = ({ onBack, space }: { onBack: () => void; space: Space }) => {
  const { toast } = useToast();
  const [exportFormat, setExportFormat] = useState<string>("pdf");
  const [dateRange, setDateRange] = useState<string>("last-month");
  const [includeMetrics, setIncludeMetrics] = useState({
    overview: true,
    sessions: true,
    participants: true,
    earnings: true,
    geographic: false
  });

  const handleExport = () => {
    // Simulate export process
    toast({
      title: "Export Started",
      description: `Generating ${exportFormat.toUpperCase()} report for "${space.title}"...`,
    });

    // Simulate export completion after 2 seconds
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Your analytics report has been downloaded successfully.",
      });
      onBack();
    }, 2000);
  };

  const formatOptions = [
    { value: "pdf", label: "PDF Report", icon: FileText },
    { value: "csv", label: "CSV Data", icon: FileSpreadsheet },
    { value: "xlsx", label: "Excel Spreadsheet", icon: BarChart3 }
  ];

  const dateRangeOptions = [
    { value: "last-week", label: "Last 7 days" },
    { value: "last-month", label: "Last 30 days" },
    { value: "last-quarter", label: "Last 3 months" },
    { value: "last-year", label: "Last 12 months" },
    { value: "all-time", label: "All time" }
  ];

  return (
    <div className="mobile-container flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="p-4 border-b border-border bg-background">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="font-semibold">Export Analytics</h1>
            <p className="text-sm text-muted-foreground">{space.title}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Export Format */}
        <Card className="p-4">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <Download size={18} />
            Export Format
          </h3>
          <div className="space-y-3">
            {formatOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.value}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    exportFormat === option.value
                      ? 'border-spaces-orange bg-spaces-orange/10'
                      : 'border-border hover:bg-accent'
                  }`}
                  onClick={() => setExportFormat(option.value)}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    exportFormat === option.value ? 'bg-spaces-orange text-white' : 'bg-muted'
                  }`}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{option.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {option.value === 'pdf' && 'Formatted report with charts and visuals'}
                      {option.value === 'csv' && 'Raw data for analysis and processing'}
                      {option.value === 'xlsx' && 'Spreadsheet with formatted data and charts'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Date Range */}
        <Card className="p-4">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <Calendar size={18} />
            Date Range
          </h3>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {dateRangeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Card>

        {/* Include Metrics */}
        <Card className="p-4">
          <h3 className="font-medium mb-4 flex items-center gap-2">
            <BarChart3 size={18} />
            Include Metrics
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="overview"
                checked={includeMetrics.overview}
                onCheckedChange={(checked) =>
                  setIncludeMetrics(prev => ({ ...prev, overview: !!checked }))
                }
              />
              <label htmlFor="overview" className="text-sm font-medium">
                Overview Statistics
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="sessions"
                checked={includeMetrics.sessions}
                onCheckedChange={(checked) =>
                  setIncludeMetrics(prev => ({ ...prev, sessions: !!checked }))
                }
              />
              <label htmlFor="sessions" className="text-sm font-medium">
                Session Details
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="participants"
                checked={includeMetrics.participants}
                onCheckedChange={(checked) =>
                  setIncludeMetrics(prev => ({ ...prev, participants: !!checked }))
                }
              />
              <label htmlFor="participants" className="text-sm font-medium">
                Participant Analytics
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="earnings"
                checked={includeMetrics.earnings}
                onCheckedChange={(checked) =>
                  setIncludeMetrics(prev => ({ ...prev, earnings: !!checked }))
                }
              />
              <label htmlFor="earnings" className="text-sm font-medium">
                Earnings & Revenue
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="geographic"
                checked={includeMetrics.geographic}
                onCheckedChange={(checked) =>
                  setIncludeMetrics(prev => ({ ...prev, geographic: !!checked }))
                }
              />
              <label htmlFor="geographic" className="text-sm font-medium">
                Geographic Distribution
              </label>
            </div>
          </div>
        </Card>

        {/* Export Summary */}
        <Card className="p-4 bg-muted/50">
          <h3 className="font-medium mb-3">Export Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Format:</span>
              <span className="font-medium">{formatOptions.find(f => f.value === exportFormat)?.label}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Period:</span>
              <span className="font-medium">{dateRangeOptions.find(d => d.value === dateRange)?.label}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sections:</span>
              <span className="font-medium">{Object.values(includeMetrics).filter(Boolean).length} selected</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Export Button */}
      <div className="p-4 border-t border-border bg-background">
        <Button 
          onClick={handleExport}
          className="w-full bg-spaces-orange hover:bg-spaces-orange/90 text-white"
          disabled={Object.values(includeMetrics).every(v => !v)}
        >
          <Download size={16} className="mr-2" />
          Export Analytics Report
        </Button>
      </div>
    </div>
  );
};

export default ExportAnalyticsScreen;