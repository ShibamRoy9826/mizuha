
function Bg(){
    return (
        <div className="w-full h-full  fixed z-[-1] overflow-hidden">
            <video className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            >
            <source src="/videos/evening-chill.mp4" type="video/mp4"/>
            Your browser does not support the video tag.
            </video> 
        </div>
    );
}

export default Bg;