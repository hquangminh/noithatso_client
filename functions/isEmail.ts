const isEmail = (email: string) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
export default isEmail;
