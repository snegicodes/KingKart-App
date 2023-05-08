import {
  Badge,
  Container,
  Dropdown,
  FormControl,
  Navbar,
  Button,
  NavbarBrand,
} from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { CartState } from "../context/Context";
import "./styles.css";
import logoImg from "../assets/logo.png";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();
  return (
    <Navbar variant="dark" style={{ height: "5rem", backgroundColor: "black" }}>
      <Container>
        <NavbarBrand>
          <Link to="/">
            <img src={logoImg} alt="Logo" height="60px" />
          </Link>
        </NavbarBrand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: "500px" }}
            placeholder="Search for a product ..."
            className="m-auto"
            onChange={(e) => {
              productDispatch({
                type: "FILTER_BY_SEARCH",
                payload: e.target.value,
              });
            }}
          />
        </Navbar.Text>
        <Dropdown align="end">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <FaShoppingCart fontSize="25px" style={{ padding: "5px" }} />
            <Badge bg="success">{cart.length}</Badge>
          </Dropdown.Toggle>

          <Dropdown.Menu
            style={{ minWidth: "350px", left: "auto", right: "0" }}
          >
            {cart.length > 0 ? (
              <>
                {cart.map((prod) => (
                  <span className="cartitem" key={prod.id}>
                    <img
                      src={prod.image}
                      className="cartItemImg"
                      alt={prod.name}
                    />
                    <div className="cartItemDetail">
                      <span>{prod.name}</span>
                      <span>₹ {prod.price.split(".")[0]}</span>
                    </div>
                    <AiFillDelete
                      fontSize="20px"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: prod,
                        })
                      }
                    />
                  </span>
                ))}
                <Link to="/cart">
                  <Button
                    variant="success"
                    style={{ width: "95%", margin: "0 10px" }}
                  >
                    Go To Cart
                  </Button>
                </Link>
              </>
            ) : (
              <span style={{ padding: 10 }}>Cart is Empty!</span>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
};

export default Header;
