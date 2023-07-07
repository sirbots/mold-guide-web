// Add a period to the end if their middle name is just an initial, else leave as is
export default function formatMiddleName(mName) {
  if (mName && mName.length === 1) return mName + ".";
  if (mName) return mName;
  if (!mName) return "";
}
