import "./SkeletonLoader.css";

interface SkeletonLoaderProps {
  variant?: "text" | "card" | "circle" | "button";
  width?: string;
  height?: string;
  className?: string;
}

export const SkeletonLoader = ({
  variant = "text",
  width,
  height,
  className = "",
}: SkeletonLoaderProps) => {
  const baseClass = "skeleton-loader";
  const variantClass = `skeleton-loader--${variant}`;

  const style: React.CSSProperties = {
    ...(width && { width }),
    ...(height && { height }),
  };

  return (
    <div
      className={`${baseClass} ${variantClass} ${className}`}
      style={style}
      role="status"
      aria-label="Cargando..."
    >
      <span className="sr-only">Cargando...</span>
    </div>
  );
};

interface LeagueCardSkeletonProps {
  count?: number;
}

export const LeagueCardSkeleton = ({ count = 1 }: LeagueCardSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-card__header">
            <SkeletonLoader variant="text" width="60%" height="24px" />
            <SkeletonLoader variant="circle" width="40px" height="40px" />
          </div>
          <SkeletonLoader variant="text" width="80%" height="16px" />
          <SkeletonLoader variant="text" width="90%" height="16px" />
          <div className="skeleton-card__footer">
            <SkeletonLoader variant="button" width="48%" height="36px" />
            <SkeletonLoader variant="button" width="48%" height="36px" />
          </div>
        </div>
      ))}
    </>
  );
};

interface DashboardSkeletonProps {
  cardsCount?: number;
}

export const DashboardSkeleton = ({
  cardsCount = 6,
}: DashboardSkeletonProps) => {
  return (
    <div className="dashboard-skeleton">
      {/* Welcome Banner Skeleton */}
      <div className="skeleton-banner">
        <SkeletonLoader variant="text" width="60%" height="40px" />
        <SkeletonLoader variant="text" width="80%" height="20px" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="skeleton-stats">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="skeleton-stat-card">
            <SkeletonLoader variant="circle" width="48px" height="48px" />
            <SkeletonLoader variant="text" width="100%" height="32px" />
            <SkeletonLoader variant="text" width="60%" height="16px" />
          </div>
        ))}
      </div>

      {/* Leagues Grid Skeleton */}
      <div className="skeleton-leagues">
        <LeagueCardSkeleton count={cardsCount} />
      </div>
    </div>
  );
};
