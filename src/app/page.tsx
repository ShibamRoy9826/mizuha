"use client";
import Btn from "@/components/button";
import SearchBox from "@/components/modules/search";
import Image from "next/image";
import ShortcutsContainer from "@/components/modules/shortcutsContainer";
import Clock from "@/components/modules/clock";
import VolumeControl from "@/components/volume";
import {useEffect, useRef, useState} from "react";
import DialogContainer from "@/components/dialogContainer";
import Bg from "@/components/background";


export default function Home() {
    const [dialogName,setDialogName]=useState<string|null>(null);
    const [isVolumeVisible,setIsVolumeVisible]=useState(false);

    const [bgPath,setBgPath]=useState("/videos/cozy-room.mp4");

    // Sidebar dialogs
    const toggleSettings=()=> setDialogName(dialogName!=="settings"?"settings":null);
    const togglePomodoro=()=> setDialogName(dialogName!=="pomodoro"?"pomodoro":null);
    const toggleEye=()=> setDialogName(dialogName!=="eyeWindow"?"eyeWindow":null);
    const toggleTodo=()=> setDialogName(dialogName!=="todo"?"todo":null);
    const toggleJournal=()=> setDialogName(dialogName!=="journal"?"journal":null);
    const toggleStations=()=> setDialogName(dialogName!=="stations"?"stations":null);
    const toggleEffects=()=> setDialogName(dialogName!=="effects"?"effects":null);

    // Bottombar dialogs
    const toggleBg=()=> setDialogName(dialogName!=="bg"?"bg":null);
    const [playing,setPlaying]=useState(false);

    // Other vars
    const togglePlaying=()=> setPlaying(!playing);
    const toggleVolumeWindow=()=> setIsVolumeVisible(!isVolumeVisible);

    const changeBg=()=>{
      const bg=localStorage.getItem("wallSource");
      if(bg){
        setBgPath(bg);
      }
      // console.log("change bg ran!");
    };

    //Button refs
    const bgBtnRef=useRef<HTMLDivElement|null>(null);
    const settingsBtnRef=useRef<HTMLDivElement|null>(null);
    const pomoBtnRef=useRef<HTMLDivElement|null>(null);
    const eyeBtnRef=useRef<HTMLDivElement|null>(null);
    const todoBtnRef=useRef<HTMLDivElement|null>(null);
    const journalBtnRef=useRef<HTMLDivElement|null>(null);
    const stationBtnRef=useRef<HTMLDivElement|null>(null);
    const effectBtnRef=useRef<HTMLDivElement|null>(null);

    const [dialogPos,setDialogPos]=useState({
      "bg":[500,100],
      "settings":[100,100],
      "pomo":[100,100],
      "eye":[100,100],
      "journal":[100,100],
      "todo":[100,100],
      "stations":[100,100],
      "effects":[100,100]
    });

    // Dialog positioning
    function getPos(ele:HTMLDivElement|null,name:string){
      if(ele){
        const rect=ele.getBoundingClientRect();
        // console.log("Got bounding client rect for ",name, " its ", rect.left,rect.top);
        setDialogPos(
              prev => ({
          ...prev,
          [name]: [rect.left, rect.top]
        }));
        // console.log("This is the thingy: ",dialogPos);
      }else{
        setDialogPos(
              prev => ({
          ...prev,
          [name]: [0,0]
        }));

      }
    }

    useEffect(()=>{
      getPos(bgBtnRef.current,"bg");
      getPos(settingsBtnRef.current,"settings");
      getPos(todoBtnRef.current,"todo");
      getPos(journalBtnRef.current,"journal");
      getPos(pomoBtnRef.current,"pomo");
      getPos(eyeBtnRef.current,"eye");
      getPos(stationBtnRef.current,"stations");
      getPos(effectBtnRef.current,"effects");
    },[])

  return (
    <>
    <Bg
    bgPath={bgPath}
    />
    <Clock/>
    <SearchBox/>
    <ShortcutsContainer/>

    {/* Sidebar */}
    <div className="absolute left-2 top-1/3 -translate-y-1/2 bg-[var(--tint)] shadow-sm flex flex-col items-center justify-center gap-2 rounded-xl backdrop-blur-sm px-3 py-8 w-auto max-w-[4rem]">
    <Btn
   icon={
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Settings"> <g id="Vector"> <path d="M20.3499 8.92293L19.9837 8.7192C19.9269 8.68756 19.8989 8.67169 19.8714 8.65524C19.5983 8.49165 19.3682 8.26564 19.2002 7.99523C19.1833 7.96802 19.1674 7.93949 19.1348 7.8831C19.1023 7.82677 19.0858 7.79823 19.0706 7.76998C18.92 7.48866 18.8385 7.17515 18.8336 6.85606C18.8331 6.82398 18.8332 6.79121 18.8343 6.72604L18.8415 6.30078C18.8529 5.62025 18.8587 5.27894 18.763 4.97262C18.6781 4.70053 18.536 4.44993 18.3462 4.23725C18.1317 3.99685 17.8347 3.82534 17.2402 3.48276L16.7464 3.1982C16.1536 2.85658 15.8571 2.68571 15.5423 2.62057C15.2639 2.56294 14.9765 2.56561 14.6991 2.62789C14.3859 2.69819 14.0931 2.87351 13.5079 3.22396L13.5045 3.22555L13.1507 3.43741C13.0948 3.47091 13.0665 3.48779 13.0384 3.50338C12.7601 3.6581 12.4495 3.74365 12.1312 3.75387C12.0992 3.7549 12.0665 3.7549 12.0013 3.7549C11.9365 3.7549 11.9024 3.7549 11.8704 3.75387C11.5515 3.74361 11.2402 3.65759 10.9615 3.50224C10.9334 3.48658 10.9056 3.46956 10.8496 3.4359L10.4935 3.22213C9.90422 2.86836 9.60915 2.69121 9.29427 2.62057C9.0157 2.55807 8.72737 2.55634 8.44791 2.61471C8.13236 2.68062 7.83577 2.85276 7.24258 3.19703L7.23994 3.1982L6.75228 3.48124L6.74688 3.48454C6.15904 3.82572 5.86441 3.99672 5.6517 4.23614C5.46294 4.4486 5.32185 4.69881 5.2374 4.97018C5.14194 5.27691 5.14703 5.61896 5.15853 6.3027L5.16568 6.72736C5.16676 6.79166 5.16864 6.82362 5.16817 6.85525C5.16343 7.17499 5.08086 7.48914 4.92974 7.77096C4.9148 7.79883 4.8987 7.8267 4.86654 7.88237C4.83436 7.93809 4.81877 7.96579 4.80209 7.99268C4.63336 8.26452 4.40214 8.49186 4.12733 8.65572C4.10015 8.67193 4.0715 8.68752 4.01521 8.71871L3.65365 8.91908C3.05208 9.25245 2.75137 9.41928 2.53256 9.65669C2.33898 9.86672 2.19275 10.1158 2.10349 10.3872C2.00259 10.6939 2.00267 11.0378 2.00424 11.7255L2.00551 12.2877C2.00706 12.9708 2.00919 13.3122 2.11032 13.6168C2.19979 13.8863 2.34495 14.134 2.53744 14.3427C2.75502 14.5787 3.05274 14.7445 3.64974 15.0766L4.00808 15.276C4.06907 15.3099 4.09976 15.3266 4.12917 15.3444C4.40148 15.5083 4.63089 15.735 4.79818 16.0053C4.81625 16.0345 4.8336 16.0648 4.8683 16.1255C4.90256 16.1853 4.92009 16.2152 4.93594 16.2452C5.08261 16.5229 5.16114 16.8315 5.16649 17.1455C5.16707 17.1794 5.16658 17.2137 5.16541 17.2827L5.15853 17.6902C5.14695 18.3763 5.1419 18.7197 5.23792 19.0273C5.32287 19.2994 5.46484 19.55 5.65463 19.7627C5.86915 20.0031 6.16655 20.1745 6.76107 20.5171L7.25478 20.8015C7.84763 21.1432 8.14395 21.3138 8.45869 21.379C8.73714 21.4366 9.02464 21.4344 9.30209 21.3721C9.61567 21.3017 9.90948 21.1258 10.4964 20.7743L10.8502 20.5625C10.9062 20.5289 10.9346 20.5121 10.9626 20.4965C11.2409 20.3418 11.5512 20.2558 11.8695 20.2456C11.9015 20.2446 11.9342 20.2446 11.9994 20.2446C12.0648 20.2446 12.0974 20.2446 12.1295 20.2456C12.4484 20.2559 12.7607 20.3422 13.0394 20.4975C13.0639 20.5112 13.0885 20.526 13.1316 20.5519L13.5078 20.7777C14.0971 21.1315 14.3916 21.3081 14.7065 21.3788C14.985 21.4413 15.2736 21.4438 15.5531 21.3855C15.8685 21.3196 16.1657 21.1471 16.7586 20.803L17.2536 20.5157C17.8418 20.1743 18.1367 20.0031 18.3495 19.7636C18.5383 19.5512 18.6796 19.3011 18.764 19.0297C18.8588 18.7252 18.8531 18.3858 18.8417 17.7119L18.8343 17.2724C18.8332 17.2081 18.8331 17.1761 18.8336 17.1445C18.8383 16.8247 18.9195 16.5104 19.0706 16.2286C19.0856 16.2007 19.1018 16.1726 19.1338 16.1171C19.166 16.0615 19.1827 16.0337 19.1994 16.0068C19.3681 15.7349 19.5995 15.5074 19.8744 15.3435C19.9012 15.3275 19.9289 15.3122 19.9838 15.2818L19.9857 15.2809L20.3472 15.0805C20.9488 14.7472 21.2501 14.5801 21.4689 14.3427C21.6625 14.1327 21.8085 13.8839 21.8978 13.6126C21.9981 13.3077 21.9973 12.9658 21.9958 12.2861L21.9945 11.7119C21.9929 11.0287 21.9921 10.6874 21.891 10.3828C21.8015 10.1133 21.6555 9.86561 21.463 9.65685C21.2457 9.42111 20.9475 9.25526 20.3517 8.92378L20.3499 8.92293Z" stroke="var(--fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M8.00033 12C8.00033 14.2091 9.79119 16 12.0003 16C14.2095 16 16.0003 14.2091 16.0003 12C16.0003 9.79082 14.2095 7.99996 12.0003 7.99996C9.79119 7.99996 8.00033 9.79082 8.00033 12Z" stroke="var(--fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g> </g></svg>
   } 
   onClick={toggleSettings}
   innerRef={settingsBtnRef}
    />
    <Btn
   icon={
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 7V12L10.5 14.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="var(--fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
   } 
   onClick={togglePomodoro}
   innerRef={pomoBtnRef}
    />
    <Btn
   icon={
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.68936 6.70456C2.52619 6.32384 2.08528 6.14747 1.70456 6.31064C1.32384 6.47381 1.14747 6.91472 1.31064 7.29544L2.68936 6.70456ZM15.5872 13.3287L15.3125 12.6308L15.5872 13.3287ZM9.04145 13.7377C9.26736 13.3906 9.16904 12.926 8.82185 12.7001C8.47466 12.4742 8.01008 12.5725 7.78417 12.9197L9.04145 13.7377ZM6.37136 15.091C6.14545 15.4381 6.24377 15.9027 6.59096 16.1286C6.93815 16.3545 7.40273 16.2562 7.62864 15.909L6.37136 15.091ZM22.6894 7.29544C22.8525 6.91472 22.6762 6.47381 22.2954 6.31064C21.9147 6.14747 21.4738 6.32384 21.3106 6.70456L22.6894 7.29544ZM19 11.1288L18.4867 10.582V10.582L19 11.1288ZM19.9697 13.1592C20.2626 13.4521 20.7374 13.4521 21.0303 13.1592C21.3232 12.8663 21.3232 12.3914 21.0303 12.0985L19.9697 13.1592ZM11.25 16.5C11.25 16.9142 11.5858 17.25 12 17.25C12.4142 17.25 12.75 16.9142 12.75 16.5H11.25ZM16.3714 15.909C16.5973 16.2562 17.0619 16.3545 17.409 16.1286C17.7562 15.9027 17.8545 15.4381 17.6286 15.091L16.3714 15.909ZM5.53033 11.6592C5.82322 11.3663 5.82322 10.8914 5.53033 10.5985C5.23744 10.3056 4.76256 10.3056 4.46967 10.5985L5.53033 11.6592ZM2.96967 12.0985C2.67678 12.3914 2.67678 12.8663 2.96967 13.1592C3.26256 13.4521 3.73744 13.4521 4.03033 13.1592L2.96967 12.0985ZM12 13.25C8.77611 13.25 6.46133 11.6446 4.9246 9.98966C4.15645 9.16243 3.59325 8.33284 3.22259 7.71014C3.03769 7.3995 2.90187 7.14232 2.8134 6.96537C2.76919 6.87696 2.73689 6.80875 2.71627 6.76411C2.70597 6.7418 2.69859 6.7254 2.69411 6.71533C2.69187 6.7103 2.69036 6.70684 2.68957 6.70503C2.68917 6.70413 2.68896 6.70363 2.68892 6.70355C2.68891 6.70351 2.68893 6.70357 2.68901 6.70374C2.68904 6.70382 2.68913 6.70403 2.68915 6.70407C2.68925 6.7043 2.68936 6.70456 2 7C1.31064 7.29544 1.31077 7.29575 1.31092 7.29609C1.31098 7.29624 1.31114 7.2966 1.31127 7.2969C1.31152 7.29749 1.31183 7.2982 1.31218 7.299C1.31287 7.30062 1.31376 7.30266 1.31483 7.30512C1.31698 7.31003 1.31988 7.31662 1.32353 7.32483C1.33083 7.34125 1.34115 7.36415 1.35453 7.39311C1.38127 7.45102 1.42026 7.5332 1.47176 7.63619C1.57469 7.84206 1.72794 8.13175 1.93366 8.47736C2.34425 9.16716 2.96855 10.0876 3.8254 11.0103C5.53867 12.8554 8.22389 14.75 12 14.75V13.25ZM15.3125 12.6308C14.3421 13.0128 13.2417 13.25 12 13.25V14.75C13.4382 14.75 14.7246 14.4742 15.8619 14.0266L15.3125 12.6308ZM7.78417 12.9197L6.37136 15.091L7.62864 15.909L9.04145 13.7377L7.78417 12.9197ZM22 7C21.3106 6.70456 21.3107 6.70441 21.3108 6.70427C21.3108 6.70423 21.3108 6.7041 21.3109 6.70402C21.3109 6.70388 21.311 6.70376 21.311 6.70368C21.3111 6.70352 21.3111 6.70349 21.3111 6.7036C21.311 6.7038 21.3107 6.70452 21.3101 6.70576C21.309 6.70823 21.307 6.71275 21.3041 6.71924C21.2983 6.73223 21.2889 6.75309 21.2758 6.78125C21.2495 6.83757 21.2086 6.92295 21.1526 7.03267C21.0406 7.25227 20.869 7.56831 20.6354 7.9432C20.1669 8.69516 19.4563 9.67197 18.4867 10.582L19.5133 11.6757C20.6023 10.6535 21.3917 9.56587 21.9085 8.73646C22.1676 8.32068 22.36 7.9668 22.4889 7.71415C22.5533 7.58775 22.602 7.48643 22.6353 7.41507C22.6519 7.37939 22.6647 7.35118 22.6737 7.33104C22.6782 7.32097 22.6818 7.31292 22.6844 7.30696C22.6857 7.30398 22.6867 7.30153 22.6876 7.2996C22.688 7.29864 22.6883 7.29781 22.6886 7.29712C22.6888 7.29677 22.6889 7.29646 22.689 7.29618C22.6891 7.29604 22.6892 7.29585 22.6892 7.29578C22.6893 7.29561 22.6894 7.29544 22 7ZM18.4867 10.582C17.6277 11.3882 16.5739 12.1343 15.3125 12.6308L15.8619 14.0266C17.3355 13.4466 18.5466 12.583 19.5133 11.6757L18.4867 10.582ZM18.4697 11.6592L19.9697 13.1592L21.0303 12.0985L19.5303 10.5985L18.4697 11.6592ZM11.25 14V16.5H12.75V14H11.25ZM14.9586 13.7377L16.3714 15.909L17.6286 15.091L16.2158 12.9197L14.9586 13.7377ZM4.46967 10.5985L2.96967 12.0985L4.03033 13.1592L5.53033 11.6592L4.46967 10.5985Z" fill="var(--fg)"></path> </g></svg>
   } 

   onClick={toggleEye}
   innerRef={eyeBtnRef}
    />
    <Btn
   icon={
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fillRule="evenodd" clipRule="evenodd" d="m20.215 2.387-8.258 10.547-2.704-3.092a1 1 0 1 0-1.506 1.316l3.103 3.548a1.5 1.5 0 0 0 2.31-.063L21.79 3.62a1 1 0 1 0-1.575-1.233zM20 11a1 1 0 0 0-1 1v6.077c0 .459-.021.57-.082.684a.364.364 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V5.5a.5.5 0 0 1 .5-.5l8.5.004a1 1 0 1 0 0-2L5.5 3A2.5 2.5 0 0 0 3 5.5v12.577c0 .76.082 1.185.319 1.627.224.419.558.753.977.977.442.237.866.319 1.627.319h12.154c.76 0 1.185-.082 1.627-.319.42-.224.754-.558.978-.977.236-.442.318-.866.318-1.627V12a1 1 0 0 0-1-1z" fill="var(--fg)"></path></g></svg>
   } 

   onClick={toggleTodo}
   innerRef={todoBtnRef}
    />

    <Btn
   icon={
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 3V5M12 3V5M15 3V5M13 9H9M15 13H9M8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V7.2C19 6.0799 19 5.51984 18.782 5.09202C18.5903 4.71569 18.2843 4.40973 17.908 4.21799C17.4802 4 16.9201 4 15.8 4H8.2C7.0799 4 6.51984 4 6.09202 4.21799C5.71569 4.40973 5.40973 4.71569 5.21799 5.09202C5 5.51984 5 6.07989 5 7.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21Z" stroke="var(--fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
   } 
   onClick={toggleJournal}
   innerRef={journalBtnRef}
    />
    </div>



    {/* Bottom bar */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 shadow-md rounded-xl flex flex-row items-center justify-center gap-2 rounded-xl backdrop-blur-sm px-4 py-4 w-[90vw] bg-[var(--tint)]">

    <div className="relative rounded-xl overflow-hidden h-[4rem] w-[4rem]"> 
      <Image 
      className="select-none"
      src="/images/img.jpg"
      alt="Music Img"
      fill
      />
    </div>

    <div className="flex flex-col ml-2 ">
      <h1 className="text-xl font-semibold">Some Nice Music</h1>
      <p className="textl-sm">A Cool Guy</p>
    </div>

<div className="ml-2 mr-auto flex flex-row gap-2">
    <Btn
   icon={
    (playing ? 
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z" stroke="var(--fg)" strokeWidth="2" strokeLinejoin="round"></path> </g></svg>
      :
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2 6C2 4.11438 2 3.17157 2.58579 2.58579C3.17157 2 4.11438 2 6 2C7.88562 2 8.82843 2 9.41421 2.58579C10 3.17157 10 4.11438 10 6V18C10 19.8856 10 20.8284 9.41421 21.4142C8.82843 22 7.88562 22 6 22C4.11438 22 3.17157 22 2.58579 21.4142C2 20.8284 2 19.8856 2 18V6Z" stroke="var(--fg)" strokeWidth="1.5"></path> <path d="M14 6C14 4.11438 14 3.17157 14.5858 2.58579C15.1716 2 16.1144 2 18 2C19.8856 2 20.8284 2 21.4142 2.58579C22 3.17157 22 4.11438 22 6V18C22 19.8856 22 20.8284 21.4142 21.4142C20.8284 22 19.8856 22 18 22C16.1144 22 15.1716 22 14.5858 21.4142C14 20.8284 14 19.8856 14 18V6Z" stroke="var(--fg)" strokeWidth="1.5"></path> </g></svg>

    )
   } 
   onClick={togglePlaying}
    />


<div className="relative flex items-center justify-center w-auto h-auto">
    <Btn
   icon={
    <svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="var(--fg)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">  <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="icon" fill="var(--fg)" transform="translate(42.666667, 85.333333)"> <path d="M361.299413,341.610667 L328.014293,314.98176 C402.206933,233.906133 402.206933,109.96608 328.013013,28.8906667 L361.298133,2.26304 C447.910187,98.97536 447.908907,244.898347 361.299413,341.610667 Z M276.912853,69.77216 L243.588693,96.4309333 C283.38432,138.998613 283.38304,204.87488 243.589973,247.44256 L276.914133,274.101333 C329.118507,215.880107 329.118507,127.992107 276.912853,69.77216 Z M191.749973,1.42108547e-14 L80.8957867,87.2292267 L7.10542736e-15,87.2292267 L7.10542736e-15,257.895893 L81.0208,257.895893 L191.749973,343.35424 L191.749973,1.42108547e-14 L191.749973,1.42108547e-14 Z M42.6666667,129.895893 L95.6874667,129.895893 L149.083307,87.8749867 L149.083307,256.520747 L95.5624533,215.229227 L42.6666667,215.229227 L42.6666667,129.895893 Z" id="Shape"> </path> </g> </g> </g></svg>
   } 
   onClick={toggleVolumeWindow}
    />

    <VolumeControl
    isVisible={isVolumeVisible}
    toggleVisible={toggleVolumeWindow}
    />
</div>
</div>

<div className="mr-2 ml-auto flex flex-row gap-2 ">
    <Btn
   icon={
    <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg"  fill="var(--fg)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">  <g id="🔍-Product-Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="ic_fluent_wallpaper_24_filled" fill="#ffffff" fillRule="nonzero"> <path d="M14.7624225,13.1265588 L14.8995901,13.2636628 L20.5,19.1398323 L20.5,13.7488323 C20.5,13.3346187 20.8357864,12.9988323 21.25,12.9988323 C21.6296958,12.9988323 21.943491,13.2809862 21.9931534,13.6470618 L22,13.7488323 L22,19.2511677 C22,20.7136995 20.8582954,21.909572 19.4175223,21.9961489 L19.25,22.0011677 L13.75,22.0011677 C13.3357864,22.0011677 13,21.6653813 13,21.2511677 C13,20.8714719 13.2821539,20.5576767 13.6482294,20.5080143 L13.75,20.5011677 L19.034,20.5008323 L13.4518281,14.6435125 C13.4295242,14.6201109 13.4066562,14.5972535 13.3832443,14.5749605 C12.6254157,13.8533508 11.4493305,13.8431873 10.6799817,14.5242728 L10.5556644,14.644184 L4.978,20.5008323 L10.25,20.5011677 L10.3517706,20.5080143 C10.7178461,20.5576767 11,20.8714719 11,21.2511677 C11,21.6308635 10.7178461,21.9446587 10.3517706,21.9943211 L10.25,22.0011677 L4.75,22.0011677 L4.58247767,21.9961489 C3.19933552,21.913035 2.09181488,20.8075944 2.00542625,19.4253376 L2,19.2511677 L2,13.7488323 L2.00684662,13.6470618 C2.05650904,13.2809862 2.37030423,12.9988323 2.75,12.9988323 C3.12969577,12.9988323 3.44349096,13.2809862 3.49315338,13.6470618 L3.5,13.7488323 L3.5,19.1528323 L9.10726269,13.2650058 C10.6306609,11.6651454 13.1625622,11.6031606 14.7624225,13.1265588 Z M10.25,1.99883231 C10.6642136,1.99883231 11,2.33461875 11,2.74883231 C11,3.12852808 10.7178461,3.44232327 10.3517706,3.49198569 L10.25,3.49883231 L4.75,3.49883231 C4.10279131,3.49883231 3.5704661,3.99070698 3.50645361,4.62102707 L3.5,4.74883231 L3.5,10.2511677 C3.5,10.6653813 3.16421356,11.0011677 2.75,11.0011677 C2.37030423,11.0011677 2.05650904,10.7190138 2.00684662,10.3529382 L2,10.2511677 L2,4.74883231 C2,3.28630047 3.1417046,2.09042803 4.58247767,2.0038511 L4.75,1.99883231 L10.25,1.99883231 Z M19.25,1.99883231 L19.4175223,2.0038511 C20.8006645,2.08696495 21.9081851,3.19240555 21.9945737,4.57466238 L22,4.74883231 L22,10.2511677 L21.9931534,10.3529382 C21.943491,10.7190138 21.6296958,11.0011677 21.25,11.0011677 C20.8703042,11.0011677 20.556509,10.7190138 20.5068466,10.3529382 L20.5,10.2511677 L20.5,4.74883231 L20.4935464,4.62102707 C20.4338014,4.03272831 19.966104,3.56503091 19.3778052,3.50528592 L19.25,3.49883231 L13.75,3.49883231 L13.6482294,3.49198569 C13.2821539,3.44232327 13,3.12852808 13,2.74883231 C13,2.36913655 13.2821539,2.05534135 13.6482294,2.00567893 L13.75,1.99883231 L19.25,1.99883231 Z M16.0030577,5.99883231 C17.1076272,5.99883231 18.0030577,6.89426281 18.0030577,7.99883231 C18.0030577,9.10340181 17.1076272,9.99883231 16.0030577,9.99883231 C14.8984882,9.99883231 14.0030577,9.10340181 14.0030577,7.99883231 C14.0030577,6.89426281 14.8984882,5.99883231 16.0030577,5.99883231 Z" id="🎨-Color"> </path> </g> </g> </g></svg>
   } 
    onClick={toggleBg}
    innerRef={bgBtnRef}
    />

    <Btn
   icon={
<svg fill="var(--fg)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M1,16V8A1,1,0,0,1,3,8v8a1,1,0,0,1-2,0Zm7,4V4A1,1,0,0,0,6,4V20a1,1,0,0,0,2,0Zm5,2V2a1,1,0,0,0-2,0V22a1,1,0,0,0,2,0Zm5-2V4a1,1,0,0,0-2,0V20a1,1,0,0,0,2,0ZM22,7a1,1,0,0,0-1,1v8a1,1,0,0,0,2,0V8A1,1,0,0,0,22,7Z"></path></g></svg>
   } 
    onClick={toggleEffects}
    innerRef={effectBtnRef}
    />

    <Btn
   icon={
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M19.1414 2.07816C20.9097 3.88191 22 6.3527 22 9.07816C22 11.836 20.8836 14.333 19.0782 16.1421M5 16.2196C3.14864 14.4047 2 11.8756 2 9.07816C2 6.31313 3.12222 3.8102 4.93603 2" stroke="var(--fg)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M16.2849 5.1221C17.3458 6.13689 18 7.52697 18 9.06033C18 10.6119 17.3302 12.0167 16.2469 13.0345M7.8 13.0781C6.68918 12.057 6 10.6342 6 9.06033C6 7.50471 6.67333 6.09655 7.76162 5.07812" stroke="var(--fg)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <circle cx="12" cy="9.07812" r="2" stroke="var(--fg)" strokeWidth="1.5"></circle> <path d="M12.5 11L16 22L10.5 15.5M11.5 11L8 22L13.5 15.5" stroke="var(--fg)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
   } 
    onClick={toggleStations}
    innerRef={stationBtnRef}
    />
</div>
</div>
   <DialogContainer
  dialogName={dialogName}
  toggleBg={toggleBg}
  toggleSettings={toggleSettings}
  toggleEye={toggleEye}
  togglePomodoro={togglePomodoro}
  toggleJournal={toggleJournal}
  toggleTodo={toggleTodo}
  toggleEffects={toggleEffects}
  toggleStations={toggleStations}
  onChange={changeBg}
  posArray={dialogPos}
   />
    </>
  );
}
