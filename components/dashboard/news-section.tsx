"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NewsItem } from "@/types";
import { ExternalLink } from "lucide-react";

interface NewsSectionProps {
  news: NewsItem[];
}

export function NewsSection({ news }: NewsSectionProps) {
  return (
    <Card className="card-crypto border-0">
      <CardHeader>
        <CardTitle className="text-xl">Latest News</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news.map((item) => (
            <a
              key={item.id}
              href={item.url}
              className="flex items-start gap-3 p-3 rounded-button hover:bg-background-tertiary transition-colors group"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge
                    variant={
                      item.sentiment === "positive"
                        ? "success"
                        : item.sentiment === "negative"
                        ? "destructive"
                        : "secondary"
                    }
                    className="text-xs"
                  >
                    {item.sentiment}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {item.source}
                  </span>
                </div>
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {item.timestamp}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
