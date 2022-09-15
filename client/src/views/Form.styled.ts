import tw from "tailwind-styled-components";

const Form = tw.form`
	flex flex-col space-y-[1em] items-center
`;

const Input = tw.input`
	rounded py-[0.25em] px-[0.5em] w-full outline-none text-black/70
`;

const Button = tw.button`
	uppercase font-medium bg-third text-primary w-full py-[0.25em] px-[0.5em] 
`;

const Alert = tw.div`
	text-red-500 rounded-md border-current w-full bg-red-100 py-[0.25em] px-[0.5em]
`;

export {Alert, Button, Form, Input};
