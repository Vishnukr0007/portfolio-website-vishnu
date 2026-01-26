import React from 'react';

const ProjectSkeleton = () => {
    return (
        <div className="bg-white dark:bg-card rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 animate-pulse h-full flex flex-col">
            {/* Image Placeholder */}
            <div className="aspect-video bg-gray-200 dark:bg-gray-700 w-full"></div>

            <div className="p-8 flex flex-col flex-1 space-y-4">
                {/* Title & Category Placeholder */}
                <div className="flex justify-between items-start gap-4">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                </div>

                {/* Description Placeholder */}
                <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                </div>

                {/* Tags Placeholder */}
                <div className="flex gap-2 pt-4">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
                </div>

                {/* Links Placeholder */}
                <div className="flex gap-4 pt-4 mt-auto">
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-24"></div>
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-24"></div>
                </div>
            </div>
        </div>
    );
};

export default ProjectSkeleton;
