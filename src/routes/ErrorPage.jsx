import { useRouteError } from "react-router-dom";

    const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="mt-5">
        <div className="text-center">
            <img src="https://media.tenor.com/cofRHcGGOfoAAAAi/shy-cute.gif" className="img-fluid" alt="404 error" />
        </div>
        <br/>
        <h1 className="display-1 text-center">Oops!</h1>
        <h2 className="text-center">Page introuvable</h2>
        <p className="text-center"> Oh non... Vous semblez être égaré ! Mais ne vous inquiétez pas, chaque détour est une occasion unique de découvrir de nouveaux chemins ! ♡ </p>
        <p className="text-center">{error.data ? `${error.data}` : ''}</p>
        <div className="text-center">
            <button className="btn btn-dark" onClick={() => window.history.back()}>Go Back</button>
        </div>
        </div>
    );
};

export default ErrorPage;