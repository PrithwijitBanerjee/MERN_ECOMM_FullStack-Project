

const Thumbnails = ({ thumbnailImages }) => {
    return (
        <div className="col-md-2 product-small d-flex flex-md-column justify-content-start order-md-first">
            {
                !!(thumbnailImages?.length) && thumbnailImages?.map((image, index) => (<img key={index} className="img-fluid" src={image} alt="..." style={{ height: '150px', width: '150px' }} />))
            }
        </div>
    )
}

export default Thumbnails