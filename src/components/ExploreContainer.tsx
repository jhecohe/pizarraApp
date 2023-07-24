import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div id="container">
      <strong>Jherson Cohecha</strong>
      <p>Web: <a target="_blank" rel="noopener noreferrer" href="http://jhecohe.gitlab.io/">jhecohe</a></p>
    </div>
  );
};

export default ExploreContainer;
