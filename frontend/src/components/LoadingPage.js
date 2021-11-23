import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import './LoadingPage.css';
import { CgSpinnerTwo } from 'react-icons/cg';

function LoadingPage(props) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (props.kmlData) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [props]);

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

const mapStateToProps = (state) => {
  return {
    kmlData: state.kmlData.isLoading,
  };
};

export default connect(mapStateToProps, null)(LoadingPage);
