import React from 'react';

const ExperienceSkeleton = () => {
    return (
        <div className="relative animate-pulse pl-8 md:pl-10 pb-12">
            {/* Timeline dot */}
            <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 border-4 border-white dark:border-dark"></div>

            {/* Content */}
            <div className="space-y-3">
                {/* Date */}
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>

                {/* Title */}
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>

                {/* Subtitle/Institution */}
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>

                {/* Description List */}
                <div className="space-y-2 pt-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-11/12"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
                </div>
            </div>
        </div>
    );
};

export default ExperienceSkeleton;
