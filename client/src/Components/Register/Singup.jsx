import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  useToast,
  Text,
  Heading,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signupAction } from "../../Redux/Auth/Action";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import wizDriveImage from '../../assets/IMG_5544.jpg';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Required"),
  username: Yup.string()
    .min(4, "Username must be at least 4 characters")
    .required("Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Required"),
});

const Signup = () => {
  const initialValues = { email: "", username: "", password: "", name:"" };
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (values, actions) => {
    dispatch(signupAction(values))
    actions.setSubmitting(false);
  };

  useEffect(() => {
    if (auth.signup?.username) {
      navigate("/login")
      toast({
        title: 'Account created successfully',
        status: 'success',
        duration: 8000,
        isClosable: true,
      })
    }
  }, [auth.signup])

  return (
    <div>
      <div className="overflow-hidden">
        <Box display="flex" flexDirection="column" alignItems="center" className="lg:hidden">
          <img
            className="h-12 w-auto mb-2"
            src={wizDriveImage}
            alt="SkillConnect Logo"
          />
        </Box>
        
        {/* Only show on larger screens */}
        <Box className="hidden lg:block" textAlign="center" mb={2}>
          <Heading as="h1" size="lg" color="blue.600">
            Create Account
          </Heading>
          
          <Text fontSize="sm" color="gray.500" mb={4} textAlign="center">
            Join SkillConnect to share and develop your skills
          </Text>
        </Box>
        
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <Form className="w-full">
              <VStack spacing={3}>
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

                <Field name="username">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.username && form.touched.username}
                    >
                      <InputGroup size={{ base: "md", lg: "md" }}>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<FiUser color="gray" />}
                        />
                        <Input 
                          {...field} 
                          id="username" 
                          placeholder="Username"
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
                      <FormErrorMessage fontSize="xs">{form.errors.username}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="name">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <InputGroup size={{ base: "md", lg: "md" }}>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<FiUser color="gray" />}
                        />
                        <Input 
                          {...field} 
                          id="name" 
                          placeholder="Full Name"
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
                      <FormErrorMessage fontSize="xs">{form.errors.name}</FormErrorMessage>
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

                <Text fontSize={{ base: "2xs", sm: "xs" }} color="gray.500" textAlign="center" mt={2}>
                  By signing up, you agree to our Terms, Privacy Policy and
                  Cookies Policy.
                </Text>

                <Button
                  w="full"
                  mt={4}
                  colorScheme="blue"
                  type="submit"
                  isLoading={formikProps.isSubmitting}
                  size={{ base: "md", lg: "md" }}
                  py={{ base: 5, md: 6 }}
                  borderRadius="md"
                  fontWeight="semibold"
                  className="button-hover-effect"
                >
                  Create Account
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </div>
      
      <div className="mt-6 text-center bg-gray-50 py-3 sm:py-4 rounded-lg border border-gray-200">
        <Text fontSize={{ base: "xs", sm: "sm" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 font-medium cursor-pointer hover:underline"
          >
            Sign In
          </span>
        </Text>
      </div>
    </div>
  );
};

export default Signup;
