TL;DR:

  * **Workflow:** Create Page (`src/pages`) → Register Route (`App.jsx`) → Create Data (`src/data`) → Implement UI → Update Sitemap.
  * **Key Pattern:** **Always** use `lazy` imports for pages and heavy components to maintain performance.
  * **Data Strategy:** Separate static data into `src/data` to keep components clean.

-----

# Workflow: Adding a New Page

This guide walks through creating a example **"Hackathons"** page (`/hackathons`) as a practical example.

## 1\. Create the Page Skeleton

First, create the route component. This acts as the entry point for the new URL.

**File:** `src/pages/hackathons.jsx`

```javascript
import React from 'react';

function Hackathons() {
    return (
        <div className="container mx-auto p-4">
            <h1>Hackathons Page Setup</h1>
        </div>
    )
}

export default Hackathons;
```

-----

## 2. Register the Route

Connect the new component to the application router. You must use **Lazy Loading** to ensure the page bundle is only downloaded when the user visits the route.

**File:** `src/App.jsx`

**1. Add Lazy Import:**
Find the lazy import section at the top of the file:

```javascript
// ... existing imports
const Hackathons = lazy(() => import('./pages/hackathons.jsx'));
```

**2. Update Route Configuration:**
Add the new route object to the `children` array in `routeConfig`.

```javascript
const routeConfig = [
    {
        path: "/",
        element: (
            <ErrorBoundary>
                <RootLayout />
            </ErrorBoundary>
        ),
        // ...
        children: [
            { index: true, element: <HomePage /> },
            { path: "about-institute", element: <AboutInstitute /> },
            
            // ✅ Add new route here
            { path: "hackathons", element: <Hackathons /> },
            
            // 404 must remain last
            { path: "*", element: <NotFoundPage /> },
        ]
    }
];
```

✅ **Verification:**
Start your local server (`bun run dev`) and visit `http://localhost:5173/hackathons`. You should see "Hackathons Page Setup".

-----

## 3\. Data Layer Setup

Do not hardcode massive JSON objects inside your JSX files. Separate the data logic.

**File:** `src/data/hackathon.js`

```javascript
const hackathonData = {
    title: "Upcoming Hackathons 2025-2026",
    description: "A curated list of global hackathons for developers and designers.",
    events: [
        {
            id: 1,
            name: "System Shock: Low Level Hack 2025",
            description: "A 48-hour hackathon focused on kernel development, embedded systems, and Rust.",
            startDate: "2025-12-20T09:00:00+05:30",
            endDate: "2025-12-22T18:00:00+05:30",
            mode: "Offline",
            location: "T-Hub Hyderabad",
            images: ["https://picsum.photos/1200/600"],
            registrationLink: "https://example.com/events/system-shock",
            price: "500",
            organizer: "Open Source India"
        },
        // ... add more events as needed
    ]
};

export default hackathonData;
```

-----

## 4. Full UI Implementation

Now, update the page component to fetch data and render the UI.

**Key Requirements:**

1.  **SEO:** Use `useDynamicSEO` to set meta tags.
2.  **Performance:** `lazy` import all heavy UI components (`Card`, `Image`, `Button`).
3.  **UX:** Use `Suspense` with a `Skeleton` fallback while components load.

**File:** `src/pages/hackathons.jsx`

```javascript
import React, { lazy, Suspense } from 'react';
import { useDynamicSEO } from '@/hooks/useDynamicSEO';
import hackathonData from '@/data/hackathon';
import { Calendar, MapPin, Globe } from 'lucide-react';
import { format } from 'date-fns';
import { Skeleton } from "@/components/universal/Skeleton"; 

// ⚡ Lazy load UI components for better bundle splitting
const Card = lazy(() => import('@/components/ui/card').then(m => ({ default: m.Card })));
const CardHeader = lazy(() => import('@/components/ui/card').then(m => ({ default: m.CardHeader })));
const CardTitle = lazy(() => import('@/components/ui/card').then(m => ({ default: m.CardTitle })));
const CardContent = lazy(() => import('@/components/ui/card').then(m => ({ default: m.CardContent })));
const CardFooter = lazy(() => import('@/components/ui/card').then(m => ({ default: m.CardFooter })));
const Image = lazy(() => import('@/components/ui/image').then(m => ({ default: m.Image })));
const Button = lazy(() => import('@/components/ui/button').then(m => ({ default: m.Button })));
const MarkdownRenderer = lazy(() => import('@/components/ui/markdown-renderer'));

// Helper: Safely format dates
const formatDate = (dateString) => {
    try {
        return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
        return dateString;
    }
};

// Component: Loading State
const LoadingFallback = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border h-[400px] bg-card p-4 space-y-4">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-20 w-full" />
            </div>
        ))}
    </div>
);

export default function Hackathons() {
    // 1. Setup SEO
    const { title, description, events } = hackathonData;
    useDynamicSEO({ title, description });

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            {/* Header Section */}
            <header className="mb-12 text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                    {title}
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    {description}
                </p>
            </header>

            {/* Content Grid */}
            <Suspense fallback={<LoadingFallback />}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((h, index) => (
                        <Card key={index} className="flex flex-col h-full hover:shadow-xl transition-all border-t-4 border-t-primary group">
                            
                            {/* Image Section */}
                            <div className="relative h-52 overflow-hidden bg-secondary/10">
                                {h.images?.[0] ? (
                                    <Image
                                        src={h.images[0]}
                                        alt={h.name}
                                        useOriginalUrl
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        enableLightbox={false}
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-muted-foreground/30">
                                        <Globe size={64} />
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 bg-background/90 px-3 py-1 rounded-full text-xs font-semibold border">
                                    {h.mode}
                                </div>
                            </div>

                            {/* Details Section */}
                            <CardHeader>
                                <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">
                                    {h.name}
                                </CardTitle>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-primary" />
                                        <span>{formatDate(h.startDate)} - {formatDate(h.endDate)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-primary" />
                                        <span className="line-clamp-1">{h.location}</span>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="grow">
                                <div className="prose prose-sm dark:prose-invert line-clamp-3 text-muted-foreground">
                                    <MarkdownRenderer content={h.description} />
                                </div>
                            </CardContent>

                            <CardFooter className="pb-6">
                                <Button className="w-full font-semibold shadow-md" size="lg" asChild>
                                    <a href={h.registrationLink} target="_blank" rel="noopener noreferrer">
                                        Register Now
                                    </a>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </Suspense>
        </div>
    );
}
```

> **Refactoring Tip:** If the `Card` logic becomes complex, move it to a dedicated component file: `src/components/page-components/hackathons/HackathonCard.jsx`.

-----

## 5\. Update Build Scripts

Finally, register the new path in the build system so the sitemap generator knows about it.

**File:** `scripts/generate-sitemap.js`

Locate the `staticRoutes` array and append your new path:

```javascript
const staticRoutes = [
  '/',
  '/about-institute',
  // ... existing routes
  '/hackathons', // ✅ Add this
];
```

**Why?** This ensures `/hackathons` appears in `sitemap.xml`, allowing Google to index the page correctly.
