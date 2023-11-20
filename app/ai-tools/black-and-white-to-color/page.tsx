import { FileUploader } from "@/components/ai-tools/image-upload";
import { ContentBlock } from "@/components/core/content-block";
import PageTitle from "@/components/layout/page-title";
import { CardContent } from "@/components/ui/card";
import { createOrder, runModel } from "@/lib/utils/replicate";
import { getAppBaseUrl } from "@/lib/utils/url";
import { del } from "@vercel/blob";
import { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import input from "./input.jpg";
import output from "./output.png";

export const dynamic = "force-dynamic";

const title = "AI Black and White Photo Colorizer";
const description =
  "Elevate your photos with our AI Black and White Photo Colorizer. Effortlessly bring vintage images to life in vibrant colors. Try our advanced tool for unparalleled results in photo transformation. Restore and revitalize your memories with ease – explore the future of photo coloring now!";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [
      {
        url: "https://cdn.capture.techulus.in/e1ab7054-dabc-48d6-a33f-c18038aac1c8/137bbe87161f3eb7bb2ef09419572824/image?url=https%3A%2F%2Fmanageprompt.com%2Fai-tools%2Fblack-and-white-to-color&delay=1&vw=1200&vh=630",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  metadataBase: new URL(getAppBaseUrl()),
};

export default async function BlackAndWhiteToColor() {
  async function renderImage(image: string) {
    "use server";

    console.log("starting replicate", image);
    const output = await runModel(
      "cjwbw/bigcolor:9451bfbf652b21a9bccc741e5c7046540faa5586cfa3aa45abc7dbb46151a4f7",
      image,
      {
        scale: 2,
        face_enhance: true,
      }
    );

    // @ts-ignore
    const outputUrl = output[0].image;
    console.log("replicate done", outputUrl);

    const order = await createOrder({
      inputUrl: image,
      outputUrl: outputUrl,
      type: "black-and-white-to-color",
    });

    await del(image);

    redirect(`/ai-tools/order/${order.id}`);
  }

  return (
    <>
      <PageTitle
        title={String(metadata.title)}
        subTitle="Transform Memories with Stunning Colors"
      />

      <ContentBlock>
        <CardContent>
          <div className="flex flex-col mt-4">
            <FileUploader onUploadComplete={renderImage} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
              <div className="flex flex-col items-center justify-center">
                <p className="text-lg text-bold pt-2">Before</p>
                <Image src={input} alt={title} />
              </div>
              <div className="flex flex-col items-center justify-center">
                <p className="text-lg text-bold pt-2">After</p>
                <Image src={output} alt={title} />
              </div>
            </div>
          </div>
        </CardContent>
      </ContentBlock>
    </>
  );
}
