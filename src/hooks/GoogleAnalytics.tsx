const useGoogleAnalytics = () => {
  const analyticsCode = (gaTag: string) => {
    if (gaTag) {
      const scriptExists = document.querySelector(
        `script[src="https://www.googletagmanager.com/gtag/js?id=${gaTag}"]`
      );
      if (!scriptExists) {
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${gaTag}`;
        document.body.appendChild(script);
        const configScript = document.createElement("script");
        configScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaTag}');
      `;
        document.body.appendChild(configScript);

        return () => {
          document.body.removeChild(script);
          document.body.removeChild(configScript);
        };
      }
    }
  };

  return analyticsCode;
};

export default useGoogleAnalytics;
