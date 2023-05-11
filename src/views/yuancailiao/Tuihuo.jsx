import { Button, Popover, Select } from "antd";

const Tuihuo = () => {
  /* <div style={{ display: 'flex', width: 288 }}>
                  {Array.map((item, index) => {
                    if (!tagShow) {
                      if (index === 3) {
                        return (
                          <Tag
                            key={item}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              setTagShow(true);
                            }}
                          >
                            ...
                          </Tag>
                        );
                      } else if (index < 3) {
                        return (
                          <Tooltip title={item} placement="topRight">
                            <Tag
                              key={item}
                              color="success"
                              style={{
                                maxWidth: 48,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              {item}
                            </Tag>
                          </Tooltip>
                        );
                      }
                    } else {
                      return (
                        <Tooltip title={item} placement="topRight">
                          <Tag
                            key={item}
                            color="success"
                            style={{
                              maxWidth: 48,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {item}
                          </Tag>
                        </Tooltip>
                      );
                    }
                  })}
                </div> */

  return (
    <div>
      <Popover content={<p>1111</p>}>
        <Button>1111</Button>
      </Popover>
      <Select></Select>
    </div>
  );
};

export default Tuihuo;
