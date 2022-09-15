import {useAppSelector} from "@/app/redux";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2";

interface IRequiredAuth {
  children: JSX.Element;
  fallbackNavigate?: string;
}

function RequiredAuth(props: IRequiredAuth) {
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!auth.accessToken && props.fallbackNavigate) {
    (async () => {
      const fired = await Swal.fire({
        text: "You need to authenticated",
        icon: "warning",
      });
      if (props.fallbackNavigate && fired.isConfirmed == true) {
        navigate(props.fallbackNavigate, {replace: true});
      }
    })();
  }
  if (!auth.accessToken) return <></>;

  return props.children;
}

export default RequiredAuth;
