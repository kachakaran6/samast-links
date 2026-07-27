import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";
import { IToastTypes } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const showToast = ({
  msg,
  position = "top-center",
  isError,
  className = "",
}: IToastTypes) => {
  if (!isError) {
    toast.success(msg, {
      position: position,
      // Styling
      style: {
        borderRadius: "8px",
        background: "#11131e",
        color: "#fff",
      },
      className: `${className} bg-dark-4 text-white border border-primary-500`,
      iconTheme: {
        primary: "#1ca9c9",
        secondary: "#FFFAEE",
      },
    });
  } else {
    toast.error(msg, {
      position: position,
      // Styling
      style: {
        borderRadius: "8px",
        background: "#11131e",
        color: "#fff",
      },
      className: `${className} bg-dark-4 text-white border border-red`,
    });
  }
};

export const maskEmail = (email: string) =>
  `${email.slice(0, email.indexOf("@")).slice(0, 2)}******${email
    .slice(0, email.indexOf("@"))
    .slice(-2)}${email.slice(email.indexOf("@"))}`;

export const filterElementsByDays = (
  array: any,
  days: number,
  date_key: string = "$createdAt"
) => {
  const currentDate = new Date();
  const thresholdDate = new Date(currentDate);
  thresholdDate.setDate(currentDate.getDate() - days);

  return array.filter((element: any) => {
    const dateFrom = new Date(element[date_key]);
    return dateFrom >= thresholdDate && dateFrom <= currentDate;
  });
};

export const filterElementsByDay = (
  array: any,
  targetDate: Date,
  date_key: string = "$createdAt"
) => {
  return array.filter((element: any) => {
    const createdAtDate = new Date(element[date_key]);
    return (
      createdAtDate.getDate() === targetDate.getDate() &&
      createdAtDate.getMonth() === targetDate.getMonth() &&
      createdAtDate.getFullYear() === targetDate.getFullYear()
    );
  });
};

export function getLength(elements: any[]) {
  return elements.length;
}

export function calculatePercentage(oldCount: number, newCount: number) {
  if (oldCount === 0) {
    return newCount > 0 ? 100 : 0;
  }

  return ((newCount - oldCount) / oldCount) * 100;
}

export const handleBlocksData = (documents: any) => {
  let tempBlocksData: any = [];

  documents.forEach((ele: any) => {
    let tempValues;
    if (ele?.other_values) {
      tempValues = JSON.parse(ele?.other_values);
    }

    if (ele?.link) {
      tempValues = { link: ele?.link, ...tempValues };
    } else {
      tempValues = { ...tempValues };
    }
    tempBlocksData.push(
      JSON.parse(JSON.stringify({ ...ele, val: tempValues }))
    );
  });

  tempBlocksData = JSON.parse(
    JSON.stringify(
      tempBlocksData.sort((a: any, b: any) => a.block_order - b.block_order)
    )
  );
  return tempBlocksData;
};

// Function to convert UTC to IST
export const convertDateToIST = (utcDateTimeString: string) => {
  var utcDate = new Date(utcDateTimeString + " UTC");

  var istDate = new Date(
    utcDate.getTime() + (330 + utcDate.getTimezoneOffset()) * 60000
  );

  var options: any = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  var istTimeString = istDate.toLocaleString("en-IN", options);

  return istTimeString;
};
