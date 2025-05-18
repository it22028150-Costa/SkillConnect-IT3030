import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  useToast,
  Text,
  Heading,
  Divider,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signinAction } from "../../Redux/Auth/Action";
import { getUserProfileAction } from "../../Redux/User/Action";
import wizDriveImage from '../../assets/IMG_5544.jpg';
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
});

const Signin = () => {
  const initialValues = { email: "", password: "" };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, signin } = useSelector((store) => store);
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const token = localStorage.getItem("token");
  
  useEffect(() => {
    if (token) dispatch(getUserProfileAction(token || signin));
  }, [signin, token]);

  useEffect(() => {
    if (user?.reqUser?.username && token) {
      navigate(`/${user.reqUser?.username}`);
      toast({
        title: "Sign in successful",
        status: "success",
        duration: 8000,
        isClosable: true,
      });
    }
  }, [user.reqUser]);

  const handleSubmit = (values, actions) => {
    dispatch(signinAction(values));
    actions.setSubmitting(false);
  };

  return (
    <div>
      <div className="overflow-hidden">
        <Box display="flex" flexDirection="column" alignItems="center" className="lg:hidden">
          <img
            className="h-12 w-auto mb-4"
            src={wizDriveImage}
            alt="SkillConnect Logo"
          />
        </Box>
        
        {/* Only show this heading on large screens */}
        <Box className="hidden lg:block" textAlign="center" mb={6}>
          <Heading as="h1" size="lg" color="blue.600">
            Welcome Back
          </Heading>
        </Box>
          
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <Form className="w-full space-y-4">
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <InputGroup size={{ base: "md", lg: "md" }}>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<FiMail color="gray" />}
                      />
                      <Input
                        {...field}
                        id="email"
                        placeholder="Email address"
                        bg="gray.50"
                        borderColor="gray.300"
                        fontSize={{ base: "sm", lg: "sm" }}
                        _focus={{
                          bg: "white",
                          borderColor: "blue.500",
                          boxShadow: "0 0 0 1px #3182ce",
                        }}
                      />
                    </InputGroup>
                    <FormErrorMessage fontSize="xs">{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="password">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <InputGroup size={{ base: "md", lg: "md" }}>
                      <InputLeftElement
                        pointerEvents="none"
                        children={<FiLock color="gray" />}
                      />
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Password"
                        bg="gray.50"
                        borderColor="gray.300"
                        fontSize={{ base: "sm", lg: "sm" }}
                        _focus={{
                          bg: "white",
                          borderColor: "blue.500",
                          boxShadow: "0 0 0 1px #3182ce",
                        }}
                      />
                      <InputRightElement width="3rem">
                        <Button
                          h="1.5rem"
                          size="sm"
                          bg="transparent"
                          _hover={{ bg: "transparent" }}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <FiEyeOff /> : <FiEye />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage fontSize="xs">{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Text fontSize="xs" sm={{ base: "xs", sm: "sm" }} textAlign="right" color="blue.600" cursor="pointer" fontWeight="medium">
                Forgot password?
              </Text>

              <Button
                mt={4}
                w="full"
                colorScheme="blue"
                type="submit"
                isLoading={formikProps.isSubmitting}
                size={{ base: "md", lg: "md" }}
                py={{ base: 5, md: 6 }}
                borderRadius="md"
                fontWeight="semibold"
                className="button-hover-effect"
              >
                Sign In
              </Button>

              <Box position="relative" my={4}>
                <Divider />
                <Text
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  bg="white"
                  px={3}
                  color="gray.500"
                  fontSize={{ base: "xs", sm: "sm" }}
                >
                  OR
                </Text>
              </Box>

              <Button
                as="a"
                href="http://localhost:5454/oauth2/authorization/google"
                w="full"
                colorScheme="gray"
                variant="outline"
                leftIcon={<FcGoogle size={20} />}
                size={{ base: "md", lg: "md" }}
                py={{ base: 5, md: 6 }}
                borderRadius="md"
              >
                Sign in with Google
              </Button>
            </Form>
          )}
        </Formik>
      </div>

      <div className="mt-6 text-center bg-gray-50 py-3 sm:py-4 rounded-lg border border-gray-200">
        <Text fontSize={{ base: "xs", sm: "sm" }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 font-medium cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </Text>
      </div>
    </div>
  );
};

export default Signin;
