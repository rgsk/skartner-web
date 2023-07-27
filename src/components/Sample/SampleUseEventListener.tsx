import useEventListener from 'hooks/utils/useEventListener';

interface ISampleUseEventListenerProps {}
const SampleUseEventListener: React.FC<ISampleUseEventListenerProps> = ({}) => {
  useEventListener('scroll', () => {
    console.log('window scrolled');
  });
  useEventListener('resize', () => {
    console.log('window resized');
  });
  return (
    <div>
      {Array(100)
        .fill(0)
        .map((_, i) => (
          <p key={i}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad ullam
            distinctio provident molestias. Atque vero voluptatum quidem
            molestias harum! Laudantium blanditiis reprehenderit quam ratione
            ipsum, deserunt commodi ducimus cum vel.
          </p>
        ))}
    </div>
  );
};
export default SampleUseEventListener;
