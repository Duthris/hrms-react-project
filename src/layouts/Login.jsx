import {
  Grid,
  Header,
  Segment,
  Form,
  Button,
  Message,
} from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import UserService from "../services/userService";
import * as Yup from "yup";
import swal from "sweetalert";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { userLogin } from "../store/actions/authActions";

export default function Login() {
  const history = useHistory();

  const dispatch = useDispatch()

  const handleLogin=(user)=>{
    dispatch(userLogin(user))
  }

  let userService = new UserService();

  const userLoginSchema = Yup.object().shape({
    email: Yup.string()
      .required("E-mail cannot be empty!")
      .email("Geçerli bir email adresi giriniz"),
    password: Yup.string().required("Bu alan doldurulmak zorundadır"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userLoginSchema,
    onSubmit: (values) => {
      userService
        .login(values)
        .then((result) => {
          if (result.data.success === true) {
            handleLogin(result.data.data);
            history.push("/");
            swal({
              title: "Succeed!",
              text: result.data.message,
              icon: "success",
              button: "Ok",
            })
          } else {
            swal({
              title: "Login is Unsuccessful!",
              text: result.data.message,
              icon: "error",
              button: "Ok",
            })
          }
        })  
    },
  });

  return (
    <>
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column
          style={{ marginRight: "8em", marginTop: "13em", maxWidth: 450 }}
        >
          <Header as="h1" color="violet" textAlign="center">
            Login
          </Header>
          <Form onSubmit={formik.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail"
                type="email"
                required
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.errors.email && formik.touched.email && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.email}
                </div>
              )}

              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                required
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password && (
                <div className={"ui pointing red basic label"}>
                  {formik.errors.password}
                </div>
              )}

              <Button type="submit" color="violet" fluid size="large">
                Login
              </Button>
            </Segment>
          </Form>
          <Message color="violet">
            <h4>
              Are you a candidate or employer?{" "}
              <Link style={{ color: "#009C95" }} to="/register">
                Register now!
              </Link>
            </h4>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
}
