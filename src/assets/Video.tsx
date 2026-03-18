interface VideoProps {
  src: string;
}

export const Video = ({ src }: VideoProps) => {
  return (
    <iframe
      width="250"
      height="125"
      src={src}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
};
