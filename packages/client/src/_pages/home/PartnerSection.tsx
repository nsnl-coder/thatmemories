import RowContainer from '@src/components/container/RowContainer';
import FilePreview from '@src/components/filePreview/FilePreview';

function PartnerSection(): JSX.Element {
  const logos = [
    'https://files.elasticwebdev.com/6430d4067f5938d58680faeb/3145490040324--4acd-a6af-9476fbdf7c5d.png',
    'https://files.elasticwebdev.com/6430d4067f5938d58680faeb/3145490039915--4265-96f2-9713a0db821f.png',
    'https://files.elasticwebdev.com/6430d4067f5938d58680faeb/3145490039709--456f-a765-040dc95dacb8.png',
    'https://files.elasticwebdev.com/6430d4067f5938d58680faeb/3145490039482--4771-b8f8-9a7a958688da.png',
    'https://files.elasticwebdev.com/6430d4067f5938d58680faeb/3145490039259--4c7d-9d45-45392d9a95e0.png',
    'https://files.elasticwebdev.com/6430d4067f5938d58680faeb/3145490039042--48ef-95fb-b21d0d8d1d1e.png',
  ];

  return (
    <RowContainer className="py-4 md:py-4 lg:py-8">
      <div className="grid grid-cols-3 md:grid-cols-3 gap-x-8 lg:grid-cols-6 opacity-60 hover:opacity-100">
        {logos.map((logo) => (
          <div key={logo} className="relative aspect-video">
            <FilePreview
              src={logo}
              fill
              sizes="(max-width:768px) 33.333vw,(max-width:1024px),16.66vw "
            />
          </div>
        ))}
      </div>
    </RowContainer>
  );
}

export default PartnerSection;
