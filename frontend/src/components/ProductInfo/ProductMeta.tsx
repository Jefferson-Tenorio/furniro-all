import { IconLink } from "../IconLink";

type ProductMetaProps = {
  sku: string;
  category: string;
};

const ProductMeta = ({ sku, category }: ProductMetaProps) => {
  return (
    <div className="mt-10 border-t pt-6 text-sm text-gray-400">
      <table className="border-separate border-spacing-y-3">
        <tbody>
          <tr>
            <td className="pr-8">SKU</td>
            <td className="pr-3">:</td>
            <td className="text-gray-500">{sku}</td>
          </tr>

          <tr>
            <td className="pr-8">Category</td>
            <td className="pr-3">:</td>
            <td className="text-gray-500">{category}</td>
          </tr>

          <tr>
            <td className="pr-8">Tags</td>
            <td className="pr-3">:</td>
            <td className="text-gray-500">{category}</td>
          </tr>

          <tr>
            <td className="pr-8">Share</td>
            <td className="pr-3">:</td>
            <td className="flex items-center gap-3 text-black">
              <IconLink
                href="https://www.facebook.com/airevolutioncompany/"
                iconSrc="/Icons/facebook-icon.svg"
                alt="Facebook"
              />
              <IconLink
                href="https://aircompany.ai/"
                alt="Twitter"
                iconSrc="/Icons/twitter-icon.svg"
              />
              <IconLink
                href="https://www.linkedin.com/company/airevolutioncompany/"
                iconSrc="/Icons/linkedin-icon.svg"
                alt="LinkedIn"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductMeta;
