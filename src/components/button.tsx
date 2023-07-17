'use client'
import { useRouter } from 'next/navigation';

export type ButtonAction = 'back';

const Button = (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & { action: ButtonAction }) => {
  const router = useRouter()

  const handleClick = () => {
    switch (props.action) {
      case 'back':
        router.back();
        break;

      default:
        break;
    }
  }

  return <button {...props} onClick={handleClick} className={props.className}>{props.children}</button>;
};

export default Button;
