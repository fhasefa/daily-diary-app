function Home() {

    const pageStyles = {
        backgroundColor: '#f5f5f5',
        padding: '2rem',
        fontSize: '1.2rem',
        lineHeight: '1.5',
        fontFamily: 'Arial, sans-serif',
      };

      const headingStyles = {
        fontSize: '2rem',
        marginBottom: '1rem',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#333',
      };

      const paragraphStyles = {
        marginBottom: '1rem',
        color: '#666',
      };

    return (
            <div style={pageStyles}>
                <h1 style={headingStyles}>About Page</h1>
                <h4 style={paragraphStyles}>Diaries can be a valuable tool for personal growth and self-discovery, 
                    as they allow individuals to reflect on their experiences and gain insight into their 
                    thoughts and feelings. They can also serve as a historical record of one's life, documenting 
                    important events and milestones over time.
                </h4>
                <img src="https://www.science.org/do/10.1126/science.caredit.adb1781/abs/_20220304_wl.jpg" style={{ display: 'block', margin: 'auto' }} />
            </div>
    )
}

export default Home