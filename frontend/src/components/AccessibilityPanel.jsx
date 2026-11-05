export default function AccessibilityPanel({ fontScale, setFontScale, highContrast, setHighContrast }) {
  return <aside className="access-card" aria-labelledby="access-title">
    <div className="access-symbol" aria-hidden="true">✳</div>
    <span className="eyebrow">DO SEU JEITO</span>
    <h2 id="access-title">Acessibilidade é prioridade.</h2>
    <p>Personalize a experiência para ficar mais confortável para você.</p>
    <div className="access-setting"><div><strong>🔠 Tamanho do texto</strong><small>Ajuste para ler melhor</small></div><div className="font-controls"><button type="button" aria-label="Diminuir tamanho do texto" disabled={fontScale <= .9} onClick={() => setFontScale(v => Math.max(.9, Math.round((v-.1)*10)/10))}>A−</button><span aria-live="polite">{Math.round(fontScale*100)}%</span><button type="button" aria-label="Aumentar tamanho do texto" disabled={fontScale >= 1.5} onClick={() => setFontScale(v => Math.min(1.5, Math.round((v+.1)*10)/10))}>A+</button></div></div>
    <div className="access-setting"><div><strong>◐ Alto contraste</strong><small>Mais definição e legibilidade</small></div><button type="button" className="toggle" aria-label="Ativar alto contraste" aria-pressed={highContrast} onClick={() => setHighContrast(v => !v)}><span /></button></div>
    <div className="access-note">💚 <span>Não há cronômetro. Você aprende no seu próprio tempo.</span></div>
  </aside>;
}
