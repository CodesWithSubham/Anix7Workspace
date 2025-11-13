import Link, { LinkProps } from "next/link";
import { twMerge } from "tailwind-merge";
import { AiOutlineLoading } from "react-icons/ai";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, LabelHTMLAttributes, ReactNode } from "react";
import Image from "next/image";

export function Button({
  children,
  loading = false,
  loadingText = "Loading...",
  className = "",
  svg,
  loadingSvg = <AiOutlineLoading className="text-white" />,
  as = "button", // 'button' by default
  ...props
}: ButtonProps) {
  const isAnchor = "href" in props;
  const isLabel = "htmlFor" in props;

  const Component = isAnchor ? Link : isLabel ? "label" : "button";

  return (
    <Component
      className={twMerge(
        `inline-flex justify-center items-center m-2 py-2.5 px-4 text-white font-bold outline-0 border-0 rounded-md overflow-hidden max-w-xs cursor-pointer transition-all duration-500 bg-(--linkC) select-none min-h-8`,
        loading || (props as any).disabled
          ? "cursor-not-allowed opacity-75"
          : "hover:shadow-[inset_3px_3px_10px_#00000045,inset_-3px_-3px_10px_#00000045] hover:scale-102 hover:*:scale-95",
        className
      )}
      {...{
        ...(props as any),
        ...(!isAnchor && !isLabel && { disabled: loading || (props as any).disabled }),
      }}
    >
      <span
        className={twMerge(
          "inline-flex justify-center items-center gap-2 whitespace-nowrap transition-all duration-500",
          loading && "[&_svg]:w-4 [&_svg]:h-4"
        )}
      >
        {loading ? (
          <>
            {loadingSvg}
            {loadingText}
          </>
        ) : (
          <>
            {svg}
            {children}
          </>
        )}
      </span>
    </Component>
  );
}

// IconButton Wrapper
export const IconButton = ({
  className,
  ...props
}: ButtonProps & {
  children?: React.ReactNode;
}) => {
  return (
    <Button
      className={twMerge(
        "inline-block shrink-0 bg-transparent rounded-full p-2 m-0 aspect-square hover:shadow-[inset_1px_1px_5px_#00000045,inset_-1px_-1px_5px_#00000045] text-inherit",
        className
      )}
      {...props}
    >
      {props.children}
    </Button>
  );
};

type CardButtonProps = {
  image: string | URL;
  title: string;
  description: string;
  imageClassName?: string;
  imageWidth?: number;
  imageHeight?: number;
  isNew?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement> & // native <a> attributes
  LinkProps; // next/link specific props

export function CardButton({
  image,
  title,
  description,
  className = "",
  imageClassName = "",
  imageWidth,
  imageHeight,
  isNew,
  ...props
}: CardButtonProps) {
  return (
    <Link
      className={twMerge(
        "w-full relative flex h-full flex-row items-center gap-4 p-4 overflow-hidden hover:scale-102 transition-all",
        "shadow-[0px_3px_10px_rgba(0,0,0,.20),_inset_20px_20px_18px_rgba(255,255,255,.9),_inset_-20px_-20px_18px_rgba(0,0,0,.07)]",
        "dark:shadow-[inset_20px_20px_18px_rgba(255,255,255,.07),_inset_-20px_-20px_18px_rgba(0,0,0,.9)]",
        "hover:shadow-[0px_3px_10px_rgba(0,0,0,.20),_inset_20px_20px_18px_rgba(0,0,0,.07),_inset_-20px_-20px_18px_rgba(255,255,255,.9)]",
        "dark:hover:shadow-[0px_-1px_10px_rgba(255,255,255,.10),inset_20px_20px_18px_rgba(0,0,0,.9),_inset_-20px_-20px_18px_rgba(255,255,255,.07)]",
        className
      )}
      {...props}
    >
      {/* Ribbon */}
      {isNew && (
        <div className="absolute z-10 top-0 left-0 w-10 aspect-square grid place-items-center">
          <div className="absolute rotate-[-45deg] bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-[10px] px-8 py-0.5 text-center ring-2 ring-red-600 border border-white shadow-md">
            NEW
          </div>
        </div>
      )}
      {image && (
        <div
          className={twMerge(
            "w-1/4 max-w-24 aspect-square flex-shrink-0 flex items-center justify-center overflow-hidden",
            imageClassName
          )}
        >
          <Image
            src={image.toString()}
            alt={title || "Feature Image"}
            width={imageWidth || 96}
            height={imageHeight || 96}
            className="object-contain w-full h-full"
          />
        </div>
      )}
      <div className="text-left">
        {title && <h3 className="text-xl md:text-2xl font-semibold mb-2">{title}</h3>}
        {description && <p className="text-sm text-gray-700 dark:text-gray-200">{description}</p>}
      </div>
    </Link>
  );
}

type CommonProps = {
  loading?: boolean;
  loadingText?: ReactNode;
  loadingSvg?: ReactNode;
  svg?: ReactNode;
  className?: string;
  rootClassName?: string;
  children?: ReactNode;
};

// Base variants
type ButtonAsButton = {
  as?: "button";
} & CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsAnchor = {
  as: "a";
  href: string;
} & CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonAsLabel = {
  as: "label";
  htmlFor: string;
} & CommonProps &
  LabelHTMLAttributes<HTMLLabelElement>;

// Full discriminated union
export type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLabel;
