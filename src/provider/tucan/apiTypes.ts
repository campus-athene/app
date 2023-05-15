export type Settings = {
  privacy: 'complete' | 'balanced' | 'minimal';
  push: {
    messages: boolean;
  };
};

export type ReportErrorRequest = {
  level: 'error' | 'warning' | 'info';
  timestamp: number;
  privacy: 'complete' | 'balanced';
  message: string;
  data: string;
};
