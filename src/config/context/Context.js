import { onAuthStateChanged } from "firebase/auth";
import {
  Component,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAuth } from "../firebase";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState("loading");
  // const [error, setError] = useState(null);
  console.log("datauser firebase", user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth, setUser);
    return () => unsubscribe;
  }, []);

  return <AuthContext.Provider value={user} {...props} />;
};

export const useAuthState = () => {
  const auth = useContext(AuthContext);
  // console.log("test", auth);

  return { ...auth, isAuthenticated: auth != null };
};

// export const DataCurrentUser = () => {
//   const dataUser = useContext(AuthContext);
//   console.log("test", dataUser);

//   return { ...dataUser, UserData: dataUser };
// };

const Cosumer = AuthContext.Consumer;
export const DataCurrentUser = (Childern) => {
  return class ParentCosumer extends Component {
    render() {
      return (
        <Cosumer>
          {(value) => {
            return <Childern {...this.props} {...value} />;
          }}
        </Cosumer>
      );
    }
  };
};

export const DataInvoice = (Childern) => {
  return class ParentCosumer extends Component {
    state = {
      KodeOrder: "ORD0001",
    };

    setKodeOrder = (value) => {
      console.log(value);
      this.setState({ KodeOrder: value });
    };

    render() {
      return (
        <Cosumer>
          {(value) => {
            return (
              <Childern
                {...this.props}
                value={{ state: this.state, setKode: this.setKodeOrder }}
              />
            );
          }}
        </Cosumer>
      );
    }
  };
};
