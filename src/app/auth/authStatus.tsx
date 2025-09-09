import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store/store";
import { login, logout } from "../redux/slices/authSlice";

export const AuthStatus = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.name}!</p>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </>
      ) : (
        <button
          onClick={() =>
            dispatch(
              login({
                user: { id: "1", name: "Adesuwa", email: "a@x.com" },
                token: "sample-token"
              })
            )
          }
        >
          Login
        </button>
      )}
    </div>
  );
};