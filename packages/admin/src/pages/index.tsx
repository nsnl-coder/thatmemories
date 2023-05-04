import { useState } from 'react';

import SelectFiles from '@components/selectFiles/SelectFiles';

export default function Home() {
  const [files, setfiles] = useState<string[]>([]);

  return <div className="max-w-2xl mx-auto border p-6"></div>;
}
