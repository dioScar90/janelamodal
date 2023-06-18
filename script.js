// dialog.addEventListener('click', ({ clientX: x, clientY: y, target: dialog }) => {
//   if (dialog.tagName !== 'DIALOG')
//     return
  
//   const { left, right, top, bottom } = dialog.getBoundingClientRect()
//   const clickedOutsideModal = x < left || x > right || y < top || y > bottom

//   if (clickedOutsideModal)
//     dialog.close()
// })

class ConfirmModal {
  static #getDefaultOptions = options => ({
    title     : '',
    message   : '',
    okText    : 'Sim',
    cancelText: 'Cancelar',
    type      : 'danger',
    onOk      : () => { },
    onCancel  : () => { },
    ...options
  })

  static #createModalStyle = () => {
    const link = document.createElement('style')
    // link.type = 'text/css'
    // link.rel = 'stylesheet'
    link.dataset.js = 'modal-styles'
    link.innerHTML = `
      :root {
        --green: #28a746d7;
        --red: #dc3545d7;
        --yellow: #ffe433;
        --blue: #17a2b8d7;
        --default: #6c757dd7;
        --distance: 10px;
      }
  
      .confirm {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        padding: 10px;
        box-sizing: border-box;
        opacity: 0;
        animation-name: confirm---open;
        animation-fill-mode: forwards;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
      }
  
      .confirm--close {
        animation-name: confirm---close;
      }
  
      .confirm__window {
        width: 100%;
        max-width: 500px;
        background: white;
        font-size: 14px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  
        opacity: 0;
        transform: scale(0.75);
        animation-name: confirm__window---open;
        animation-fill-mode: forwards;
        animation-delay: 0.2s;
      }

      .confirm__window::backdrop {
        background: rgba(0, 0, 0, 0.6);
      }
  
      .confirm__titlebar, .confirm__content{ 
        padding: 1.25em;
      }
  
      .confirm__titlebar{
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
  
      .confirm__title {
        font-weight: bold;
        font-size: 1.5em;
      }
  
      .confirm__close{
        outline: none;
        transform: scale(2.5);
        color: #ffffff;
      }
  
      .confirm__close_outline {
        outline: none !important;
      }
  
      .confirm__content {
        line-height: 1.8em;
        font-weight: bold;
        font-size: 1.5em;
        content: "\f00d";
      }
  
      .confirm__buttons {
        background: none;
        display: flex;
        justify-content: flex-end;
      }
  
      .confirm__button {
        padding: 0.4em 0.8em;
        border: 2px solid #0780cc;
        border-radius: 5px;
        background: #ffffff;
        color: #0780cc;
        font-weight: bold;
        font-size: 1.2em;
        margin-left: 0.6em;
        cursor: pointer;
        outline: none;
      }
      .confirm__button__deni {
        padding: 0.4em 0.8em;
        border: 2px solid gray;
        border-radius: 5px;
        background: gray;
        color: white;
        font-weight: bold;
        font-size: 1.2em;
        margin-left: 0.6em;
        cursor: pointer;
        outline: none;
      }
  
      .confirm__button--fill {
        background: #0780cc;
        color: #ffffff;
      }
  
      .confirm__button__deni--fill {
        background: darkgray;
        color: darkgray;
      }
  
      @keyframes confirm---open {
        from { opacity: 0 }
        to { opacity: 1 }
      }
  
      @keyframes confirm---close {
        from { opacity: 1 }
        to { opacity: 0 }
      }
  
      @keyframes confirm__window---open {
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
  
      .window--success { border: 2px solid var(--green) !important; }
      .window--fail { border: 2px solid var(--red) !important;}
      .window--warning { border: 2px solid var(--yellow) !important; }
      .window--info { border: 2px solid var(--blue) !important; }
  
      .titlebar--success, .close--success, outline--success { background: var(--green) !important; }
      .titlebar--fail, .close--fail, outline--fail { background: var(--red) !important;}
      .titlebar--warning, .close--warning, outline--warning { background: var(--yellow) !important; }
      .titlebar--info, .close--info, outline--info { background: var(--blue) !important; }
  
      .close--success, outline--success { border: var(--green) !important; }
      .close--fail, outline--fail { border: var(--red) !important;}
      .close--warning, outline--warning { border: var(--yellow) !important; }
      .close--info, outline--info { border: var(--blue) !important; }
  
      .close--success { transition: var(--green) 0.15s !important; }
      .close--fail { transition: var(--red) 0.15s !important; }
      .close--warning { transition: var(--yellow) 0.15s !important; }
      .close--info { transition: var(--blue) 0.15s !important; }
    `;
  
    document.querySelector('head').append(link)
  }

  static #open = options => {
    if (!document.querySelector('[data-js="modal-styles"]'))
      this.#createModalStyle()
    
    const { type, title, message, okText, cancelText, onCancel, onOk } = this.#getDefaultOptions(options)

    const cancelTextHidden = cancelText.length > 0 ? '' : 'hidden'
    // const html = `
    //   <dialog class="confirm">
    //     <div class="confirm__window window--${type}">
    //       <div class="confirm__titlebar titlebar--${type}">
    //         <span class="confirm__title">${title}</span>
    //         <button class="confirm__close close--${type} confirm__close_outline outline--${type}">&times;</button>
    //       </div>
    //       <div class="confirm__content">${message}</div>
    //       <div class="confirm__buttons">
    //         <button class="confirm__button confirm__button--ok confirm__button--fill">${okText}</button>
    //         <button ${cancelTextHidden} class="confirm__button__deni confirm__button__deni--cancel">
    //             ${cancelText}
    //         </button>
    //       </div>
    //     </div>
    //   </dialog>
    // `
    const html = `
        <dialog class="confirm__window window--${type}">
          <div class="confirm__titlebar titlebar--${type}">
            <span class="confirm__title">${title}</span>
            <button class="confirm__close close--${type} confirm__close_outline outline--${type}">&times;</button>
          </div>
          <div class="confirm__content">${message}</div>
          <div class="confirm__buttons">
            <button class="confirm__button confirm__button--ok confirm__button--fill">${okText}</button>
            <button ${cancelTextHidden} class="confirm__button__deni confirm__button__deni--cancel">
                ${cancelText}
            </button>
          </div>
        </dialog>
    `

    const template = document.createElement('template')
    template.innerHTML = html

    // const confirmEl = template.content.querySelector('.confirm')
    const confirmEl = template.content.querySelector('.confirm__window')
    const btnClose  = template.content.querySelector('.confirm__close')
    const btnOk     = template.content.querySelector('.confirm__button--ok')
    const btnCancel = template.content.querySelector('.confirm__button__deni--cancel')

    confirmEl.addEventListener('click', e => {
      if (e.target === confirmEl) {
        onCancel()
        this.#close(confirmEl)
      }
    })

    btnOk.addEventListener('click', () => {
      try {
        onOk()
      } finally {
        this.#close(confirmEl)
      }
    })

    btnCancel.addEventListener('click', () => {
      onCancel()
      this.#close(confirmEl)
    })
    
    btnClose.addEventListener('click', () => {
      onCancel()
      this.#close(confirmEl)
    })

    document.body.appendChild(template.content)
    confirmEl.showModal() 
  }

  static info = (message, onOk) => {
    this.#open({
      title: 'Informação',
      message,
      okText: 'Confirmar',
      cancelText: '',
      type: 'info',
      onOk
    })
  }

  static success = (message, onOk) => {
    this.#open({
      title: 'Sucesso',
      message,
      okText: 'Confirmar',
      cancelText: '',
      type: 'success',
      onOk
    })
  }

  static fail = (message, onOk) => {
    this.#open({
      title: 'Erro',
      message,
      okText: 'Ok',
      cancelText: '',
      type: 'fail',
      onOk
    })
  }

  static delete = (message, onOk, cancelText = '') => {
    this.#open({
      title: 'Exclusão',
      message,
      okText: 'Confirmar',
      cancelText,
      type: 'fail',
      onOk
    })
  }

  static warning = message => {
    this.#open({
      title: 'Atenção',
      message,
      okText: 'Confirmar',
      cancelText: '',
      type: 'warning'
    })
  }

  static #close = confirmEl => {
    confirmEl.classList.add('confirm--close')
    confirmEl.addEventListener('animationend', () => document.body.removeChild(confirmEl))
  }
}

document.querySelector('[data-js="botao-abrir"]').addEventListener('click', () => ConfirmModal.success('oi', () => { }))