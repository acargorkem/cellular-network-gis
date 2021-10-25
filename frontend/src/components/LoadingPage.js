import { useSelector } from 'react-redux';
import './LoadingPage.css';
import { CgSpinnerTwo } from 'react-icons/cg';

export default function LoadingPage() {
  const isLoading = useSelector((state) => state.coverageArea.isLoading);

  return (
    isLoading && (
      <div className="loading-page-container">
        <div>
          <CgSpinnerTwo className="loading-spinner" size="5em" color="white" />
        </div>
      </div>
    )
  );
}
