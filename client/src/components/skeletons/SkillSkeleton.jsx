import React from 'react';

const SkillSkeleton = () => {
    return (
        <div className="bg-white dark:bg-card p-8 rounded-2xl border border-gray-100 dark:border-white/5 animate-pulse h-full">
            {/* Category Title */}
            <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>

            {/* Skills Chips */}
            <div className="flex flex-wrap gap-3">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-24"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-28"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-32"></div>
            </div>
        </div>
    );
};

export default SkillSkeleton;
