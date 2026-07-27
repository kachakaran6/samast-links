const SimpleLink = ({ link, label, imageUrl, linkTheme }: any) => {
  return (
    <a href={link} target="_blank">
      <div
        className="block-bg block-shadow rounded-xl w-full py-3 px-4 flex gap-3 items-center"
        style={{
          background: linkTheme?.linkBgColor,
          borderColor: linkTheme?.borderColor,
          borderTopWidth: linkTheme?.borderTopWidth,
          borderBottomWidth: linkTheme?.borderBottomWidth,
          borderLeftWidth: linkTheme?.borderLeftWidth,
          borderRightWidth: linkTheme?.borderRightWidth,
          borderTopRightRadius: linkTheme?.borderTopRightRadius,
          borderTopLeftRadius: linkTheme?.borderTopLeftRadius,
          borderBottomLeftRadius: linkTheme?.borderBottomLeftRadius,
          borderBottomRightRadius: linkTheme?.borderBottomRightRadius,
        }}>
        {(label || imageUrl) && (
          <div
            className="bg-slate-900 overflow-hidden rounded-full uppercase text-white h-9 w-9 flex-center"
            style={{ background: linkTheme?.linkImageBackground }}>
            {imageUrl ? (
              <>
                <img src={imageUrl} className="object-cover" />
              </>
            ) : (
              label.charAt(0)
            )}
          </div>
        )}
        <div className="flex flex-col gap-0.5 w-[80%]">
          <div className="font-medium text-sm">{label}</div>
          <div className="text-gray-500 font-medium text-xs truncate">
            {link}
          </div>
        </div>
      </div>
    </a>
  );
};

export default SimpleLink;
