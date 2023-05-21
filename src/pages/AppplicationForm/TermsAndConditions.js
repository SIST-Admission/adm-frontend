import { Button } from "antd";

const TermsAndConditions = ({setCurrent}) => {
  return (
    <div>
      <h3 style={{marginTop: '.2em', fontSize: '1em', fontFamily: 'helvetica', textAlign:'center'}}>Terms & Conditions</h3>  
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        <ul>
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          <li>Nullam ut massa id odio imperdiet facilisis.</li>
          <li>Sed sit amet leo in mi vulputate porta.</li>
          <li>Nullam sit amet tellus tincidunt, dapibus neque blandit, pretium neque.</li>
          <li>Nullam ut massa id odio imperdiet facilisis.</li>
          <li>Praesent consequat metus quis vulputate dictum.</li>
          <li>Curabitur pharetra nunc id tincidunt porta.</li>
          <li>Mauris ut turpis et sapien lacinia laoreet.</li>
          <li>Aliquam dignissim massa ac metus mollis, eget dapibus dolor fringilla.</li>
        </ul>
      </p>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        <ul>
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          <li>Nullam ut massa id odio imperdiet facilisis.</li>
          <li>Sed sit amet leo in mi vulputate porta.</li>
          <li>Nullam sit amet tellus tincidunt, dapibus neque blandit, pretium neque.</li>
          <li>Nullam ut massa id odio imperdiet facilisis.</li>
          <li>Praesent consequat metus quis vulputate dictum.</li>
          <li>Curabitur pharetra nunc id tincidunt porta.</li>
          <li>Mauris ut turpis et sapien lacinia laoreet.</li>
          <li>Aliquam dignissim massa ac metus mollis, eget dapibus dolor fringilla.</li>
        </ul>
      </p>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
      {/* Nav */}
      <div style={{ display: 'flex',justifyContent: 'center',marginTop: 'auto'}}>
        {/* <Button style={{marginRight:'.3em'}}>Previous</Button> */}
        <Button type="primary" onClick={() => setCurrent(1)}>Accept & Continue</Button>
      </div>
    </div>
  )
}

export default TermsAndConditions;