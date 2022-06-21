import React from "react";
import clsx from "clsx";
import { useGetCoverCollection } from "../../core/cover-service-api/cover-service";

export type MaterialProps = {
  animate: boolean;
  size: "small" | "medium" | "large" | "original";
  tint?: "20" | "40" | "60" | "80" | "120";
  materialId: string;
  materialDescription?: string;
  materialUrl?: string;
};

export const Material = ({
  materialUrl,
  materialDescription,
  size,
  animate,
  tint,
  materialId
}: MaterialProps) => {
  const { data } = useGetCoverCollection({
    type: "pid",
    identifiers: [materialId],
    sizes: [size]
  });

  type TintClassesType = {
    [key: string]: string;
  };
  const tintClasses: TintClassesType = {
    default: "bg-identity-tint-120",
    "120": "bg-identity-tint-120",
    "80": "bg-identity-tint-80",
    "60": "bg-identity-tint-60",
    "40": "bg-identity-tint-40",
    "20": "bg-identity-tint-20"
  };

  const classes = {
    wrapper: clsx(
      `material material--${size}`,
      tintClasses[tint || "default"],
      {
        material__animate: animate
      }
    )
  };

  const materialCover = data?.[0]?.imageUrls?.[`${size}`]?.url && (
    <img
      src={data?.[0]?.imageUrls?.[`${size}`]?.url || ""}
      alt={materialDescription || ""}
    />
  );

  return (
    <div className="material-container">
      {/* Decide if material cover should be a link or span */}
      {materialUrl ? (
        <a href={materialUrl} className={classes.wrapper}>
          {materialCover}
        </a>
      ) : (
        <span className={classes.wrapper}>{materialCover}</span>
      )}
    </div>
  );
};
