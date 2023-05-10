import Image from "next/image";
import Button from "~/components/ui/button";
import ellipse14 from "~/assets/halos/ellipse-43.png";
import ellipse13 from "~/assets/halos/ellipse-13.png";
import ellipse10 from "~/assets/halos/hero/ellipse-10.png";
import ellipse9 from "~/assets/halos/hero/ellipse-9.png";
import ellipse11 from "~/assets/halos/hero/ellipse-11.png";
import ellipse12 from "~/assets/halos/hero/ellipse-12.png";
import group98 from "~/assets/svg/Group 98.svg";
import { useState } from "react";
import pigeonHalo from "~/assets/halos/pigeon-halo.png"
import Rectangle103 from "~/assets/Rectangle-103.png"
import Rectangle104 from "~/assets/Rectangle-104.png"
import Rectangle105 from "~/assets/Rectangle-105.png"
import Rectangle106 from "~/assets/Rectangle-106.png"
import spaceBackground from "~/assets/spaceBackground.png"


// w-full sm:w-1/3 sm:items-center xl:mt-[-60px] text-center hidden md:block mt-20
export function IntroSendPackage(){
  return(
    <div className="w-full px-8 md:px-16 bg-transparent z-[-1] ">
      <div className="absolute top-0 right-10 left-0 bottom-0 opacity-80">
        <Image
          src={ellipse10.src}
          alt=""
          className="pointer-events-none absolute left-0 -top-5 w-80"
          width={ellipse10.width}
          height={ellipse10.height}
        />
        <Image
          src={ellipse9.src}
          alt=""
          className="pointer-events-none absolute -left-20 top-20"
          width={ellipse9.width / 1.4}
          height={ellipse9.height / 1.4}
        />

        <Image
          src={ellipse11.src}
          alt=""
          className="pointer-events-none absolute -right-10 top-10 h-full overflow-hidden"
          width={ellipse11.width / 1.4}
          height={ellipse11.height / 1.4}
        />
        <Image
          src={ellipse12.src}
          alt=""
          className="pointer-events-none absolute -right-10 top-10 h-full overflow-hidden"
          width={ellipse12.width / 1.4}
          height={ellipse12.height / 1.4}
        />
      </div>
      
      <div className="pt-32 font-Poppins w-full">
        {/* <div className=" text-left flex items-center h-full text-md z-100 block">
          <Link className="hover:pointer z-100" href='/'>Home</Link>
          <MdPlayArrow color="#fff" className="mt-1 mx-1" size={15} />
          <p className=" ">Introduction Send Package</p>
        </div> */}
        <div className="z-3 flex flex-col gap-20 md:flex-row items-center relative w-full md:px-16 mt-[-2rem] ">
          <div className="w-full sm:w-2/3">
            <h1 className="mb-10 font-bold text-[2.2rem]">Send a Package</h1>
            <h4 className="text-[1.3rem] ">Get your package listed anywhere in the world in <br/>
            7 steps. Then get it <span className="text-accent">delivered anywhere, at anytime.</span> </h4>
            <div className="mt-10">
              <div className="flex w-full gap-8">
                <Button className="" styleType="accentFill" type="link" href="/whats-next">
                  Get Started
                </Button>
                <Button className="" styleType="whiteOutline" type="link" href="/app">
                  START TEST
                </Button>
              </div>
            </div>
          </div>
          <div className="relative w-100 ">
            <Image
              src={group98.src}
              alt="send a package"
              width={group98.width}
              height={group98.height}
              className="pb-12 w-100 object-contain"
              />
            <Image
              src={pigeonHalo.src}
              alt=""
              className="absolute right-0 top-0 left-0 -mb-96 object-contain"
              width={pigeonHalo.width * 4}
              height={pigeonHalo.height * 4}
            />
          </div>
        </div>
      
      </div>
    </div>
  );
}
function ImagesPackage({
  title,
  description,
  image,
  width,
  height,
  side
}:{
  title: string;
  description: JSX.Element;
  image: string;
  width: number;
  height: number;
  side: string;
} ){
  return(
    <>
      {
        title == 'We believe in you' && (
        <Image
          src={ellipse13.src}
          alt=""
          className="absolute right-0 bottom-0 object-contain"
          width={ellipse13.width /1.4}
          height={ellipse13.height /1.4}
        />)
      }
      {
        side === "right" ? (
          <div className="mx-auto flex w-full max-w-5xl flex-col pt-20 items-center justify-between md:flex-row">
            <div className="flex flex-col gap-8">
              <h2 className="break-word max-w-300">
                {title}
              </h2>
              <span className="max-w-xl font-Poppins text-accent4 leading-[46px] ">
                {description}
              </span>
            </div>
            <div className="relative w-80">
              <Image
                src={image}
                alt=""
                className="mb-12 w-80 object-contain"
                width={width}
                height={height}
                />
            </div>
          </div>
        ):(
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between md:flex-row pt-20">
            <div className="relative w-80">
              <Image
                src={image}
                alt=""
                className="mb-12 w-80 object-contain"
                width={width}
                height={height}
                />
            </div>
            <div className="flex flex-col gap-8 max-w-xl">
              <h2 className="break-word max-w-300">
                {title}
              </h2>
              <span className="max-w-xl font-Poppins text-accent4 leading-[46px] ">
                {description}
              </span>
            </div>
          </div>
        )
      }
    </>
  );
}
interface putete {
  background: string;
  boxShadow: string;
  backdropFilter: string;
}
// backdrop-filter: contrast(40%);
// backdrop-filter: drop-shadow(4px 4px 10px blue);
// backdrop-filter: grayscale(30%);
// backdrop-filter: hue-rotate(120deg);
// backdrop-filter: invert(70%);
// backdrop-filter: opacity(20%);
// backdrop-filter: sepia(90%);
// backdrop-filter: saturate(80%);
const estilazos:putete = {
  background: "linear-gradient(117.54deg, rgba(255, 255, 255, 0.5) -19.85%, rgba(235, 235, 235, 0.367354) 4.2%, rgba(224, 224, 224, 0.287504) 13.88%, rgba(212, 212, 212, 0.21131) 27.98%, rgba(207, 207, 207, 0.175584) 37.8%, rgba(202, 202, 202, 0.143432) 44.38%, rgba(200, 200, 200, 0.126299) 50.54%, rgba(196, 196, 196, 0.1) 60.21%)",
  boxShadow: '0px 1px 24px -1px rgba(0, 0, 0, 0.18)',
  backdropFilter: 'blur(10px)',
}

function TalkToOurExperts(){
  const [info, setInfo] = useState({
    fullName: '',
    email: '',
    company: '',
    request: '',
  });
  function handleChange(name:string,value:string){
    setInfo({...info, [name]: value.trim()})
    // console.log(info)
  }
  function sendForm(e : React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    // console.log(info);
    //codigo para enviar el formulario aqui
  }
  return (
    <div className="flex flex-col items-center gap-10 pt-20">
<Image
          src={ellipse9.src}
          alt=""
          className={`absolute -left-20 top-2`}
          width={ellipse9.width / 2}
          height={ellipse9.height /2}
        />
        <Image
          src={ellipse9.src}
          alt=""
          className="pointer-events-none absolute -left-20 top-2"
          width={ellipse9.width / 2}
          height={ellipse9.height / 2}
        />
      {/* <Image
          src={ellipse9.src}
          alt=""
          className="absolute -left-20 bottom-0"
          width={ellipse9.width }
          height={ellipse9.height}
      /> */}
      <h2>Talk to our experts</h2>
      <form action="" onSubmit={(e) => sendForm(e)}>
        <div className="flex flex-col mx-auto flex-wrap gap-10">
          <input type="text" style={estilazos}  placeholder="Full Name" name="fullName" 
            className="box-border border-none rounded-lg p-2 py-3 pl-7 outline-none"
            
            onChange={(e) => handleChange(e.target.name, e.target.value)} />
          <div className="flex gap-10 ">
            <input type="email" style={estilazos} name="email" id="" placeholder="Email"
              onChange={(e) => handleChange(e.target.name, e.target.value)} 
              className="box-border border-none rounded-lg p-2 py-3 pl-7 outline-none w-full md:w-auto"/>
            <input type="text" style={estilazos} name="company" id="" placeholder="Company"
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              className="box-border border-none rounded-md p-2 py-3 pl-7 outline-none w-full md:w-auto"/>
          </div>
          <textarea name="request" id="" placeholder="Type your request"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            className="box-border border-none rounded-lg p-2 py-3 pl-7 outline-none resize-none"
            style={estilazos}/>
        </div>
        <input className='bg-blue-500 text-white rounded-lg my-6 py-2 px-4 z-[100] ' type="submit"/>
      </form>
    </div>
  )
}
export default function Participant() {
  //px-8 md:px-16
  return (
    <main>
      <IntroSendPackage/>
      <div className="relative w-full flex flex-col bg-space">
        <div className="opacity-60">
        <img 
        src={spaceBackground.src}
        alt="background effect"
        className="absolute w-full object-contain"
        />
        <Image
          src={ellipse14.src}
          alt=""
          className="absolute left-0 top-[0px] object-contain"
          width={ellipse14.width/2 }
          height={ellipse14.height / 3}
        />
        <Image
          src={ellipse14.src}
          alt=""
          className="absolute left-0 top-[30px] object-contain"
          width={ellipse14.width}
          height={ellipse14.height}
        />
        <Image
          src={ellipse14.src}
          alt=""
          className="absolute left-0 bottom-[60px] object-contain"
          width={ellipse14.width /1.4}
          height={ellipse14.height /1.4}
        />
        <Image
          src={ellipse13.src}
          alt=""
          className="absolute right-0 top-[30px] object-contain"
          width={ellipse13.width /1.4}
          height={ellipse13.height /1.4}
        />
        <Image
          src={ellipse13.src}
          alt=""
          className="absolute right-0 top-20 object-contain"
          width={ellipse13.width /1.4}
          height={ellipse13.height /1.4}
        />
        </div>
        <ImagesPackage 
          title="Are you hungry?"
          description={<>Get food from your favorite restaurant, or groceries off the
          shelf, provide the right information to your drivers and they
          can get that delivered for you.</>}
          image={Rectangle103.src}
          width={Rectangle103.width}
          height={Rectangle103.height}
          side="right" />
        <ImagesPackage 
          title="Anything better than receiving a package?"
          description={<>Get food from your favorite restaurant, or groceries off the 
          shelf, provide the right information to your drivers and they
          can get that delivered for you.</>}
          image={Rectangle104.src}
          width={Rectangle104.width}
          height={Rectangle104.height}
          side="left" />
        <ImagesPackage 
          title="We believe in you"
          description={<>If you are a small company you can use our delivery <br />
          service, we can deliver industrial goods instead of moving <br />
          your operator.</>}
          image={Rectangle105.src}
          width={Rectangle105.width}
          height={Rectangle105.height}
          side="right" />

        <div>
        <Image
          src={ellipse9.src}
          alt=""
          className="pointer-events-none absolute scale-x-[-1] rotate-180"
          width={ellipse9.width / 2}
          height={ellipse9.height / 2}
        />
        <ImagesPackage 
          title="Make your package fly"
          description={<>If you need to send a large-scale package to another
          country, you can use our platform to pay someone directly
          for your service. You will receive instant compensation
          while having transparent tracking and encrypted
          messaging.</>}
          image={Rectangle106.src}
          width={Rectangle106.width}
          height={Rectangle106.height}
          side="left" />
        </div>
      </div>
      <TalkToOurExperts />

    </main>
    // images part
    // input
  );
}
