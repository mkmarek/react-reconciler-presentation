using Assets.Bridge.Styles;
using UnityEngine.UIElements;

namespace Assets.Bridge.Components
{
    public class ReactSliderIntElement : SliderInt, IReactElement
    {
        public ReactSliderIntElement(BirdgePayload.BridgeMessage.ComponentProps props)
        {
            if (props != null)
            {
                this.UpdateProps(props);
            }
        }

        public void UpdateProps(BirdgePayload.BridgeMessage.ComponentProps props)
        {
            if (props.style != null)
            {
                StyleMapper.AssignStyleProps(props.style, this);
            }
        }
    }
}
