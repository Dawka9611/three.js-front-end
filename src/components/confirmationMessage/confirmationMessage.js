import css from './confirmationMessage.module.css'

export default function ConfirmationMessage() {
   return (
      <div>
         <div>
            Хадгалаагүй өөрчлөлт байна.
         </div>
         <div>
            <button>
               Тийм
            </button>
            <button>
               Үгүй
            </button>
         </div>
      </div>
   )
}