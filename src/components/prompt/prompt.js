export default function Prompt({ message, callback }) {
   return (
      <div className="">
         <div className="">
            {message}
         </div>
         <div className="">
            <button className="" onClick={() => callback(true)}>
               Тийм
            </button>
            <button className="" onClick={() => callback(false)}>
               Үгүй
            </button>
         </div>
      </div>
   )
}
