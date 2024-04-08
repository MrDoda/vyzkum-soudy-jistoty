const DuoTestInf = `<p style="line-height:108%; font-size:12pt">
  <strong><span style="color:#e78686">Instrukce k testu pro dvojice</span></strong>
  
</p>
<br />
<p style="line-height:108%; font-size:12pt">
  Na začátku této části testu si pozorně přečtěte pravidla a instrukce.
</p>
<ol style="margin:0pt; padding-left:0pt">
  <li style="margin-left:31.34pt; line-height:108%; padding-left:4.66pt; font-size:12pt; font-weight:bold">
    Dvojice
    <ul style="margin-right:0pt; margin-left:0pt; padding-left:0pt; list-style-type:disc">
      <li style="margin-left:27.6pt; padding-left:8.4pt; font-family:serif; font-weight:normal">
        <span style="font-family:Aptos">Při vyplňování druhé části testu budete pracovat ve dvojicích, ty se automaticky vytvoří aplikací. </span>
      </li>
    </ul>
  </li>
  <br/>
  <li style="margin-left:31.34pt; line-height:108%; padding-left:4.66pt; font-size:12pt; font-weight:bold">
    Odpovídání na otázky:
    <ul style="margin-right:0pt; margin-left:0pt; padding-left:0pt; list-style-type:disc">
      <li style="margin-left:27.6pt; padding-left:8.4pt; font-family:serif; font-weight:normal">
        <span style="font-family:Aptos">Každý z vás bude nezávisle odpovídat na stejnou sadu otázek podobného typu, jako v</span><span style="font-family:Aptos">&#xa0;</span><span style="font-family:Aptos">první části testu.</span>
      </li>
      <li style="margin-left:27.6pt; padding-left:8.4pt; font-family:serif; font-weight:normal">
        <span style="font-family:Aptos">Vaše odpovědi budou založeny na vašich vlastních znalostech a úsudku.</span>
      </li>
    </ul>
  </li>
  <br/>
  <li style="margin-left:31.34pt; line-height:108%; padding-left:4.66pt; font-size:12pt; font-weight:bold">
    Zpracování neshod:
    <ul style="margin-right:0pt; margin-left:0pt; padding-left:0pt; list-style-type:disc">
      <li style="margin-left:27.6pt; padding-left:8.4pt; font-family:serif; font-weight:normal">
        <span style="font-family:Aptos">Pokud vaše odpovědi na otázku nejsou shodné, objeví se ikonka „NESHODA“.</span>
      </li>
      <li style="margin-left:27.6pt; padding-left:8.4pt; font-family:serif; font-weight:normal">
        <span style="font-family:Aptos">V tomto okamžiku budete mít 2 minuty na hledání společné odpovědi s vaším partnerem s cílem dosáhnout shody = shodnout se na správné odpovědi.</span>
      </li>
      <li style="margin-left:27.6pt; padding-left:8.4pt; font-family:serif; font-weight:normal">
        <span style="font-family:Aptos">Nebudete spolu komunikovat, ale budete se rozhodovat podle toho, na kolik věříte ve své odpovědi a na kolik věříte v</span><span style="font-family:Aptos">&#xa0;</span><span style="font-family:Aptos">odpovědi vašeho partnera ve dvojici. </span>
      </li>
    </ul>
  </li>
  <br/>
  <li style="margin-left:31.34pt; line-height:108%; padding-left:4.66pt; font-size:12pt; font-weight:bold">
    Řešení neshody:
    <ul style="margin-right:0pt; margin-left:0pt; padding-left:0pt; list-style-type:disc">
      <li style="margin-left:27.6pt; padding-left:8.4pt; font-family:serif; font-weight:normal">
        <span style="font-family:Aptos">Pokud se neshodnete a vyprší čas, odpověď bude považována za nesprávnou. A budete pokračovat v</span><span style="font-family:Aptos">&#xa0;</span><span style="font-family:Aptos">testu. </span>
      </li>
    </ul>
  </li>
  <br/>
  <li style="margin-left:31.34pt; line-height:108%; padding-left:4.66pt; font-size:12pt; font-weight:bold">
    Doplňující otázky na konci:
    <ul style="margin-right:0pt; margin-left:0pt; padding-left:0pt; list-style-type:disc">
      <li style="margin-left:27.6pt; padding-left:8.4pt; font-family:serif; font-weight:normal">
        <span style="font-family:Aptos">Po dokončení všech otázek v této části testu budou následovat tři doplňující otázky.</span>
      </li>
      <li style="margin-left:27.6pt; padding-left:8.4pt; font-family:serif; font-weight:normal">
        <span style="font-family:Aptos">Na tyto otázky odpovězte co nejupřímněji. Budou se týkat vašich zkušeností s testem a spoluprací s partnerem.</span>
      </li>
    </ul>
  </li>
</ol>
    `
export const DuoTestInfo = () => (
  <div dangerouslySetInnerHTML={{ __html: DuoTestInf }}></div>
)
