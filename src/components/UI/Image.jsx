export const Image = ({ name, alt = '', className = '', ...props }) => {
    const basePath = `/img/${name}`

    return (
        <img
            className={className}
            src={`${basePath}-medium.webp`}
            srcSet={`
                ${basePath}-small.webp 480w,
                ${basePath}-medium.webp 768w,
                ${basePath}-large.webp 1200w
            `}
            alt={alt}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 1200px"
            {...props}
        />
    );
}
