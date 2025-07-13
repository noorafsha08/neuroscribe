import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExportDataPanel = ({ timeRange, selectedEmotions, className = "" }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState('csv');
  const [exportOptions, setExportOptions] = useState({
    includeCharts: true,
    includeInsights: true,
    includeRawData: true,
    includeRecommendations: false
  });

  const exportFormats = [
    {
      id: 'csv',
      label: 'CSV',
      icon: 'FileSpreadsheet',
      description: 'Comma-separated values for Excel/Sheets',
      size: '~2.5 KB'
    },
    {
      id: 'json',
      label: 'JSON',
      icon: 'FileCode',
      description: 'Structured data for developers',
      size: '~4.1 KB'
    },
    {
      id: 'pdf',
      label: 'PDF',
      icon: 'FileText',
      description: 'Formatted report with charts',
      size: '~850 KB'
    }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      // Mock export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock data based on selections
      const mockData = generateExportData();
      
      if (exportFormat === 'csv') {
        downloadCSV(mockData);
      } else if (exportFormat === 'json') {
        downloadJSON(mockData);
      } else if (exportFormat === 'pdf') {
        downloadPDF(mockData);
      }
      
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const generateExportData = () => {
    const emotions = selectedEmotions.length > 0 ? selectedEmotions : ['calm', 'focused', 'energized', 'stressed', 'creative', 'neutral'];
    const data = [];
    
    // Generate mock emotional data
    for (let i = 0; i < 30; i++) {
      const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      const entry = {
        date: date.toISOString().split('T')[0],
        timestamp: date.toISOString(),
      };
      
      emotions.forEach(emotion => {
        entry[emotion] = Math.floor(Math.random() * 100);
      });
      
      entry.notes_count = Math.floor(Math.random() * 10);
      entry.tasks_completed = Math.floor(Math.random() * 8);
      entry.productivity_score = Math.floor(Math.random() * 100);
      
      data.push(entry);
    }
    
    return data;
  };

  const downloadCSV = (data) => {
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => row[header]).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `emotional-analytics-${timeRange}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadJSON = (data) => {
    const exportData = {
      metadata: {
        exportDate: new Date().toISOString(),
        timeRange,
        selectedEmotions,
        totalEntries: data.length
      },
      data,
      ...(exportOptions.includeInsights && {
        insights: [
          {
            type: 'pattern',
            title: 'Weekly Pattern Detected',
            description: 'You tend to feel most focused on Tuesday and Wednesday mornings.',
            confidence: 85
          }
        ]
      })
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `emotional-analytics-${timeRange}-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadPDF = (data) => {
    // Mock PDF generation - in real app would use jsPDF or similar
    const pdfContent = `
      NeuroScribe Emotional Analytics Report
      Generated: ${new Date().toLocaleDateString()}
      Time Range: ${timeRange}
      
      Summary:
      - Total entries: ${data.length}
      - Emotions tracked: ${selectedEmotions.join(', ')}
      - Average productivity: ${Math.floor(Math.random() * 100)}%
    `;
    
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `emotional-analytics-report-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleOptionToggle = (option) => {
    setExportOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-soft ${className}`}>
      <div className="p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Download" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Export Data
            </h3>
            <p className="text-sm text-text-secondary">
              Download your emotional analytics data
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Export Format Selection */}
        <div>
          <h4 className="font-medium text-text-primary mb-3">Export Format</h4>
          <div className="grid grid-cols-1 gap-3">
            {exportFormats.map((format) => (
              <button
                key={format.id}
                onClick={() => setExportFormat(format.id)}
                className={`
                  p-3 rounded-lg border transition-gentle text-left
                  ${exportFormat === format.id
                    ? 'border-primary bg-primary/10' :'border-border bg-background hover:bg-muted'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={format.icon} 
                    size={20} 
                    className={exportFormat === format.id ? 'text-primary' : 'text-text-secondary'} 
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`font-medium ${
                        exportFormat === format.id ? 'text-primary' : 'text-text-primary'
                      }`}>
                        {format.label}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {format.size}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary mt-1">
                      {format.description}
                    </p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    exportFormat === format.id 
                      ? 'border-primary bg-primary' :'border-border'
                  }`}>
                    {exportFormat === format.id && (
                      <div className="w-full h-full rounded-full bg-white scale-50" />
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Export Options */}
        <div>
          <h4 className="font-medium text-text-primary mb-3">Include in Export</h4>
          <div className="space-y-3">
            {Object.entries({
              includeRawData: 'Raw emotional data points',
              includeCharts: 'Chart visualizations (PDF only)',
              includeInsights: 'AI-generated insights',
              includeRecommendations: 'Wellness recommendations'
            }).map(([key, label]) => (
              <label key={key} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={exportOptions[key]}
                  onChange={() => handleOptionToggle(key)}
                  className="w-4 h-4 text-primary border-border rounded focus:ring-primary/20"
                />
                <span className="text-sm text-text-primary">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Export Summary */}
        <div className="bg-muted/50 rounded-lg p-3">
          <h5 className="font-medium text-text-primary mb-2">Export Summary</h5>
          <div className="space-y-1 text-sm text-text-secondary">
            <div className="flex justify-between">
              <span>Time Range:</span>
              <span className="capitalize">{timeRange}</span>
            </div>
            <div className="flex justify-between">
              <span>Emotions:</span>
              <span>{selectedEmotions.length === 0 ? 'All' : selectedEmotions.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Format:</span>
              <span className="uppercase">{exportFormat}</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Size:</span>
              <span>{exportFormats.find(f => f.id === exportFormat)?.size}</span>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <Button
          variant="default"
          size="lg"
          iconName="Download"
          onClick={handleExport}
          loading={isExporting}
          fullWidth
          className="mt-4"
        >
          {isExporting ? 'Generating Export...' : `Export as ${exportFormat.toUpperCase()}`}
        </Button>

        {/* Privacy Notice */}
        <div className="flex items-start space-x-2 p-3 bg-muted/30 rounded-lg">
          <Icon name="Shield" size={16} className="text-text-secondary mt-0.5" />
          <div className="text-xs text-text-secondary">
            <p className="font-medium mb-1">Privacy Notice</p>
            <p>
              Exported data is processed locally and never sent to external servers. 
              Your emotional data remains private and secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportDataPanel;